import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';
import { concatAll, map, concatMap, tap } from 'rxjs/operators';

@Component({
    selector: 'game-relation-table',
    template: `<admin-table></admin-table>`,
})
export class ConsoleServerGameComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({data: {id}, confirm}) => {
        console.log(event);
        if (window.confirm('Are you sure you want to delete?')) {
            this.apiService.delete(`console-to-server-to-game/${id}`).subscribe((response) => {

            });
            confirm.resolve();
        } else {
            confirm.reject();
        }
    };

    onCreateConfirm = (event) => {
        if (window.confirm('Are you sure you want to create?')) {
            delete event.newData.id;
            this.apiService.post(`console-to-server-to-game`, event.newData).subscribe((response) => {
                console.log(response);
                event.confirm.resolve();
            });
        } else {
            event.confirm.reject();
        }
    };

    onSaveConfirm = ({newData, confirm}) => {
      if (window.confirm('Are you sure you want to update?')) {
        const dataCopy = {...newData};
        delete(dataCopy.id);
        console.log('data copy', dataCopy);
        this.apiService.put(`console-to-server-to-game/${newData.id}`, dataCopy).subscribe((response) => {
            console.log(response);
            confirm.resolve();
        });
    } else {
        confirm.reject();
    }
    };

    ngAfterViewInit() {
        this.setTitle('Relations');
        this.apiService.get('game').pipe(
            concatMap(games =>
                this.apiService.get('game-console').pipe(
                    map((consoles) => ({games, consoles}))
            )),
            concatMap(mergedGamesAndConsole => this.apiService.get('game-server').pipe(
                map((servers) => ({...mergedGamesAndConsole, servers}))
            )),
            concatMap((allInfo) => this.apiService.get('console-to-server-to-game').pipe(
                map((relations) => ({...allInfo, relations}))
            ))
        ).subscribe((result) => {
            this.loadTableColumns({
                id: {
                    title: 'ID',
                    type: 'number',
                },
                gameConsole: {
                    title: 'Console',
                    type: 'html',
                    editor: {
                      type: 'list',
                      config: {
                        list: result.consoles.map((gameConsole) => ({value: gameConsole.id, title: gameConsole.name}))
                      },
                    }
                  },
                  gameServer: {
                    title: 'Server',
                    type: 'html',
                    editor: {
                      type: 'list',
                      config: {
                        list: result.servers.map((gameServer) => ({value: gameServer.id, title: gameServer.name})),
                      },
                    }
                  },
                  game: {
                    title: 'Game',
                    type: 'html',
                    editor: {
                      type: 'list',
                      config: {
                        list: result.games.map((games) => ({value: games.id, title: games.name})),
                      },
                    }
                  }
            });

            this.loadDataSource(
                result.relations.map((relation) => {
                    delete relation.createdAt;
                    delete relation.updatedAt;
                    return {
                        id: relation.id,
                        gameConsole: relation.gameConsole.name,
                        gameServer: relation.gameServer.name,
                        game: relation.game.name
                    };
                })
            );
            console.log('result: ', result);
        })
    }
}
