import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { tableData } from '../../data/smart-table';
import { AdminTableComponent } from '@admin-panel/components';
import { ApiService } from '../../http/services/api.service';
import { Subject, zip, forkJoin } from 'rxjs';
import { concatMap, concat, tap } from 'rxjs/operators';

@Component({
    selector: 'ngx-game-items-table',
    templateUrl: './game-items.component.html',
    styleUrls: ['./game-items.component.scss'],
})
export class GameItemsComponent extends AdminTableComponent implements AfterViewInit {
    public games;
    selectedItem;

    selectionSubscriber$ = new Subject();

    constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
        super();
    }

    onDeleteConfirm = ({ data: { id }, confirm }) => {
      if (window.confirm('Are you sure you want to delete?')) {
          this.apiService.delete(`users/${id}`).subscribe((response) => {});
          confirm.resolve();
      } else {
          confirm.reject();
      }
  };

  onCreateConfirm = (event) => {
      if (window.confirm('Are you sure you want to create?')) {
          delete event.newData.id;
          this.apiService.post(`users`, event.newData).subscribe((response) => {
              console.log(response);
              event.confirm.resolve();
          });
      } else {
          event.confirm.reject();
      }
  };

  onSaveConfirm = ({ newData, confirm }) => {
      if (window.confirm('Are you sure you want to update?')) {
          const dataCopy = { ...newData };

          Object.keys(dataCopy).forEach((key) => {
            if(!dataCopy[key]) {
              delete dataCopy[key];

            }
          })

          console.log('resulted obj: ', dataCopy);
          delete dataCopy.itemId;
          
          this.apiService.put(`item/${newData.itemId}`, dataCopy).subscribe((response) => {
              confirm.resolve();
          });
      } else {
          confirm.reject();
      }
  };

    ngAfterViewInit() {
        this.apiService.get('console-to-server-to-game').subscribe((games) => {
            this.games = games.map((relation) => ({
                id: relation.id,
                name: `${relation.game.name} ${relation.gameConsole.name} ${relation.gameServer.name}`,
            }));
        });

        this.selectionSubscriber$
            .asObservable()
            .pipe(concatMap((evt) => this.apiService.get(`game-item/filter/${evt}`)))
            .subscribe((res) => {
                this.loadDataSource(
                    res.map((game) => {
                        return {
                            itemId: game.item.id,
                            name: game.item.name,
                            description: game.item.description,
                            trait: game.item.trait,
                            level: game.item.level,
                            cp: game.item.cp,
                            quality: game.item.quality,
                            color: game.item.color,
                        };
                    })
                );

                this.cdr.markForCheck();
                this.cdr.detectChanges();
            });

        this.setTitle('Game Items');

        this.apiService.get('roles').subscribe((result) => {
            this.loadTableColumns({
                itemId: {
                    title: 'ID',
                    type: 'number',
                    editable: false,
                },
                name: {
                    title: 'Name',
                    type: 'string',
                },
                description: {
                    title: 'Description',
                    type: 'string',
                },
                trait: {
                    title: 'Trait',
                    type: 'string',
                },
                level: {
                    title: 'Level',
                    type: 'string',
                },
                cp: {
                    title: 'CP',
                    type: 'string',
                },
                quality: {
                    title: 'Quality',
                    type: 'string',
                },
                color: {
                    title: 'Color',
                    type: 'string',
                },
            });
        });
    }

    changeOption(event) {
        this.selectionSubscriber$.next(event);
    }
}
