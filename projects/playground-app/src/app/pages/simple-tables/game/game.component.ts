import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';
import { MultiSelComponent } from './multisel.component';
@Component({
    selector: 'game-table',
    template: `<ngx-admin-table></ngx-admin-table>`,
})
export class GameComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({ data: { id }, confirm }) => {
        if (window.confirm('Are you sure you want to delete?')) {
            this.loadingOn();
            this.apiService.delete(`game/${id}`).subscribe(() => {
                this.handleSuccessReq('Game deleted successfully');
            }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
            confirm.resolve();
        } else {
            confirm.reject();
        }
    }

    onCreateConfirm = (event) => {
        if (window.confirm('Are you sure you want to create?')) {
            delete event.newData.id;
            this.loadingOn();
            this.apiService.post(`game`, event.newData).subscribe((response) => {
                this.handleSuccessReq('Game created successfully');
                event.confirm.resolve();
            }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm = ({ newData, confirm }) => {
        if (newData.removePlan === '') {
            newData.removePlan = [];
        }

        if (window.confirm('Are you sure you want to update?')) {
            const dataCopy = { ...newData };
            this.loadingOn();
            delete dataCopy.id;
            this.apiService.put(`game/${newData.id}`, dataCopy).subscribe((response) => {
                this.handleSuccessReq('Game updated successfully');
                confirm.resolve();
            }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
        } else {
            confirm.reject();
        }
    }

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
            this.loadingOff();
            this.loadDataSource(
                games.map((game) => {
                    delete game.createdAt;
                    delete game.updatedAt;
                    game.plans = game.plans.map((plan) => plan.name).toString();
                    return game;
                })
            );
        }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    }
}
