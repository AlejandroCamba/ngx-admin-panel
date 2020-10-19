import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';

@Component({
    selector: 'console-table',
    template: `<admin-table></admin-table>`,
})
export class ConsoleComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({data: {id}, confirm}) => {
        console.log(event);
        if (window.confirm('Are you sure you want to delete?')) {
            this.apiService.delete(`game-console/${id}`).subscribe((response) => {

            });
            confirm.resolve();
        } else {
            confirm.reject();
        }
    };

    onCreateConfirm = (event) => {
        if (window.confirm('Are you sure you want to create?')) {
            delete event.newData.id;
            this.apiService.post(`game-console`, event.newData).subscribe((response) => {
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
        this.apiService.put(`game-console/${newData.id}`, dataCopy).subscribe((response) => {
            console.log(response);
            confirm.resolve();
        });
    } else {
        confirm.reject();
    }
    };

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
