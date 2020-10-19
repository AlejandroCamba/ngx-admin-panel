import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';
import { MultiSelComponent } from './multisel.component';
@Component({
    selector: 'game-table',
    template: `<admin-table></admin-table>`,
})
export class GameComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({ data: { id }, confirm }) => {
        console.log(event);
        if (window.confirm('Are you sure you want to delete?')) {
            this.apiService.delete(`game/${id}`).subscribe((response) => {});
            confirm.resolve();
        } else {
            confirm.reject();
        }
    };

    onCreateConfirm = (event) => {
        if (window.confirm('Are you sure you want to create?')) {
            delete event.newData.id;
            this.apiService.post(`game`, event.newData).subscribe((response) => {
                console.log(response);
                event.confirm.resolve();
            });
        } else {
            event.confirm.reject();
        }
    };

    onSaveConfirm = ({ newData, confirm }) => {
        console.log('newdata', newData);
        if (newData.removePlan === "") {
            newData.removePlan = [];
        }

        if (window.confirm('Are you sure you want to update?')) {
            const dataCopy = { ...newData };
            console.log('newdata', newData);
            delete dataCopy.id;
            console.log('data copy', dataCopy);
            this.apiService.put(`game/${newData.id}`, dataCopy).subscribe((response) => {
                console.log(response);
                confirm.resolve();
            });
        } else {
            confirm.reject();
        }
    };

    ngAfterViewInit() {
        this.setTitle('Games');
        this.loadTableColumns({
            id: {
                title: 'ID',
                type: 'number',
            },
            name: {
                title: 'Nombre',
                type: 'string',
            },
            short_name: {
                title: 'Acronym',
                type: 'string',
            },
            plans: {
                title: 'Plans',
                type: 'html',
                filter: false,
                editor: {
                    type: 'custom',
                    component: MultiSelComponent,
                },
            }
        });

        this.apiService.get('game').subscribe((games) => {
            console.log(games);
            this.loadDataSource(
                games.map((game) => {
                    delete game.createdAt;
                    delete game.updatedAt;
                    game.plans = game.plans.map((plan) => plan.name).toString();
                    return game;
                })
            );
        });
    }
}
