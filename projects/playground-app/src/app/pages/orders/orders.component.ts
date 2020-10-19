import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { tableData } from '../../data/smart-table';
import { AdminTableComponent } from '@admin-panel/components';
import { ApiService } from '../../http/services/api.service';
import { MultiSelComponent } from '../simple-tables/game/multisel.component';

@Component({
    selector: 'ngx-orders-table',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersTableComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
        super();
    }

    onDeleteConfirm = ({ data: { id }, confirm }) => {
        alert('Sorry, orders cannot be removed');
    
    };

    onCreateConfirm = (event) => {
        alert('Sorry, orders cannot be created');
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

            this.apiService.put(`order/${newData.id}`, dataCopy).subscribe((response) => {
                confirm.resolve();
            });
        } else {
            confirm.reject();
        }
    };

    ngAfterViewInit() {
        this.setTitle('Orders');

        this.apiService.get('order').subscribe((result) => {
            this.loadTableColumns({
                id: {
                    title: 'ID',
                    type: 'number',
                    editable: false,
                },
                description: {
                    title: 'Description',
                    type: 'string',
                    editable: false,
                },
                months: {
                    title: 'Months',
                    editable: false
                },
                paymentMethod: {
                    title: 'Payment Method',
                    editable: false,
                },
                status: {
                    title: 'Order Status',
                    editable: false,
                },
                responseFromTeam: {
                    title: 'Team Response',
                    editable: true
                },
                assignedAccount: {
                    title: 'Account To Deposit',
                    editable: true
                },
                amount: {
                    title: 'Order Amount',
                    editable: false,
                },
                remainingAmount: {
                    title: 'Remaining',
                    editable: false,
                }
            });
        });

        this.apiService.get('order').subscribe((orders) => {
            console.log('orderss', orders);
            this.loadDataSource(
                orders.map((order) => {
                    return {
                        id: order.id,
                        description: order.description,
                        months: order.months,
                        paymentMethod: order.paymentMethod,
                        status: order.status,
                        responseFromTeam: order.responseFromTeam,
                        amount: order.paymentMethod === 'IN-GAME'? order.plan?.gamePrice : order.plan?.price,
                        remainingAmount: order.remainingGameAmount,
                    };
                })
            );
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }
}
