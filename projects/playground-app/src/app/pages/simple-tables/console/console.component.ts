import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';

@Component({
    selector: 'console-table',
    template: `<ngx-admin-table></ngx-admin-table>`,
})
export class ConsoleComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({data: {id}, confirm}) => {
        if (window.confirm('Are you sure you want to delete?')) {
            this.loadingOn();
            this.apiService.delete(`game-console/${id}`).subscribe((response) => {
                this.handleSuccessReq('Game Console Deleted Succesfully');
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
            this.apiService.post(`game-console`, event.newData).subscribe((response) => {
                this.handleSuccessReq('Game Console Created Succesfully');
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
        console.log('data copy', dataCopy);
        this.apiService.put(`game-console/${newData.id}`, dataCopy).subscribe((response) => {
            this.handleSuccessReq('Game Console Updated Succesfully');
            confirm.resolve();
        }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    } else {
        confirm.reject();
    }
    }

    ngAfterViewInit() {
        this.setTitle('Game Consoles');
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

        this.apiService.get('game-console').subscribe((consoles) => {
            this.loadDataSource(
                consoles.map((gameConsole) => {
                    delete gameConsole.createdAt;
                    delete gameConsole.updatedAt;
                    return gameConsole;
                })
            );
        }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    }
}
