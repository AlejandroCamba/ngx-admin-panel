import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';

@Component({
    selector: 'server-table',
    template: `<admin-table></admin-table>`,
})
export class ServerComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({data: {id}, confirm}) => {
        console.log(event);
        if (window.confirm('Are you sure you want to delete?')) {
            this.apiService.delete(`game-server/${id}`).subscribe((response) => {

            });
            confirm.resolve();
        } else {
            confirm.reject();
        }
    }

    onCreateConfirm = (event) => {
        if (window.confirm('Are you sure you want to create?')) {
            delete event.newData.id;
            this.apiService.post(`game-server`, event.newData).subscribe((response) => {
                console.log(response);
                event.confirm.resolve();
            });
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm = ({newData, confirm}) => {
      if (window.confirm('Are you sure you want to update?')) {
        const dataCopy = {...newData};
        delete(dataCopy.id);
        console.log('data copy', dataCopy);
        this.apiService.put(`game-server/${newData.id}`, dataCopy).subscribe((response) => {
            console.log(response);
            confirm.resolve();
        });
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
            console.log(consoles);
            this.loadDataSource(
                consoles.map((gameConsole) => {
                    delete gameConsole.createdAt;
                    delete gameConsole.updatedAt;
                    return gameConsole;
                })
            );
        });
    }
}
