import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { tableData } from '../../data/smart-table';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { ApiService } from '../../http/services/api.service';
import { MultiSelComponent } from '../simple-tables/game/multisel.component';

@Component({
    selector: 'ngx-payments-table',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
})
export class PaymentsTableComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
        super();
    }

    onDeleteConfirm = ({ data: { id }, confirm }) => {
        alert('Sorry, payments cannot be removed');

    }

    onCreateConfirm = (event) => {
        alert('Sorry, payments cannot be created');
    }

    onSaveConfirm = ({ newData, confirm }) => {
        if (window.confirm('Are you sure you want to update?')) {
            const dataCopy = { ...newData };

            Object.keys(dataCopy).forEach((key) => {
                if (!dataCopy[key]) {
                    delete dataCopy[key];
                }
            });

            console.log('resulted obj: ', dataCopy);

            this.apiService.put(`payment/${newData.id}`, dataCopy).subscribe((response) => {
                confirm.resolve();
            });
        } else {
            confirm.reject();
        }
    }

    ngAfterViewInit() {
        this.setTitle('Payments');

        this.apiService.get('payment').subscribe((result) => {
            this.loadTableColumns({
                id: {
                    title: 'ID',
                    type: 'number',
                    editable: false,
                },
                amount: {
                    title: 'Amount',
                    type: 'string',
                    editable: false
                },
                status: {
                    title: 'Status',
                    type: 'string',
                    editable: true,
                    editor: {
                        type: 'list',
                        config: {
                            list: [{title: 'APPROVED', value: 'APPROVED' }, { title: 'REJECTED', value: 'REJECTED'}]
                          },
                    }
                },
                nicknameMakingDeposit: {
                    title: 'In-Game Nickname',
                    type: 'string',
                    editable: false,
                },
                messageFromTeam: {
                    title: 'Team Response',
                    type: 'string',
                    editable: true
                },
                consoleServerGame: {
                    title: 'Console Server Game Relation',
                    type: 'string',
                    editable: false
                },
                orderId: {
                    title: 'OrderId',
                    type: 'string',
                    editable: false
                }
            });
        });

        this.apiService.get('payment').subscribe((payments) => {
            console.log(payments);
            this.loadDataSource(
                payments.map((payment) => {
                    return {
                        id: payment.id,
                        amount: payment.amount,
                        status: payment.status,
                        nicknameMakingDeposit: payment.nicknameMakingDeposit,
                        messageFromTeam: payment.messageFromTeam,
                        consoleServerGame: payment.order.consoleToServerToGame.id,
                        orderId: payment.order.id
                    };
                })
            );
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }
}
