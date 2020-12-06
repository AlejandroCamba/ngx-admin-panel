import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';

@Component({
    selector: 'server-table',
    template: `<ngx-admin-table></ngx-admin-table>`,
})
export class ServerComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({data: {id}, confirm}) => {
        if (window.confirm('Are you sure you want to delete?')) {
            this.loadingOn();
            this.apiService.delete(`game-server/${id}`).subscribe((response) => {
                this.handleSuccessReq('Server deleted succesfully');
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
            this.apiService.post(`game-server`, event.newData).subscribe((response) => {
                this.handleSuccessReq('Server created succesfully');
                event.confirm.resolve();
            }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm = ({newData, confirm}) => {
      if (window.confirm('Are you sure you want to update?')) {
        const dataCopy = {...newData};
        delete(dataCopy.id);
        this.loadingOn();
        this.apiService.put(`game-server/${newData.id}`, dataCopy).subscribe((response) => {
            this.handleSuccessReq('Server updated succesfully');
            confirm.resolve();
        }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    } else {
        confirm.reject();
    }
    }

    ngAfterViewInit() {
        this.setTitle('Game Servers');
        this.loadTableColumns({
            id: {
                title: 'ID',
                type: 'number',
            },
            name: {
                title: 'Nombre',
                type: 'string',
            },
        });

        this.apiService.get('game-server').subscribe((consoles) => {
            this.loadDataSource(
                consoles.map((gameConsole) => {
                    delete gameConsole.createdAt;
                    delete gameConsole.updatedAt;
                    return gameConsole;
                })
            );
        },  (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    }
}
