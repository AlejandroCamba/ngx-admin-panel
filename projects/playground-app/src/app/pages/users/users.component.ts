import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { tableData } from '../../data/smart-table';
import { AdminTableComponent } from '@admin-panel/components';
import { ApiService } from '../../http/services/api.service';
import { MultiSelComponent } from '../simple-tables/game/multisel.component';

@Component({
    selector: 'ngx-users-table',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersTableComponent extends AdminTableComponent implements AfterViewInit {
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
                if (!dataCopy[key]) {
                    delete dataCopy[key];
                }
            });

            console.log('resulted obj: ', dataCopy);

            this.apiService.put(`users/${newData.id}`, dataCopy).subscribe((response) => {
                confirm.resolve();
            });
        } else {
            confirm.reject();
        }
    };

    ngAfterViewInit() {
        this.setTitle('Users');

        this.apiService.get('roles').subscribe((result) => {
            this.loadTableColumns({
                id: {
                    title: 'ID',
                    type: 'number',
                    editable: false,
                },
                username: {
                    title: 'E-Mail',
                    type: 'string',
                },
                password: {
                    title: 'Password',
                    editable: false,
                    editor: {
                        type: 'string',
                    },
                },
                status: {
                    title: 'Status',
                    editable: true,
                    editor: {
                        type: 'list',
                        config: {
                            list: [
                                { title: 'NORMAL', value: 'NORMAL' },
                                { title: 'BLOCKED', value: 'BLOCKED' },
                            ],
                        },
                    },
                },
                role: {
                    title: 'Role',
                    type: 'string',
                    editor: {
                        type: 'list',
                        config: {
                            list: result.map((role) => ({
                                value: role.id,
                                title: role.name,
                            })),
                        },
                    },
                },
            });
        });

        this.apiService.get('users/all').subscribe((users) => {
            this.loadDataSource(
                users.map((user) => {
                    return { id: user.id, username: user.username, status: user.status, role: user.role.name };
                }).filter((user) => {
                  user.role !== 'ADMIN'
                })
            );
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }
}
