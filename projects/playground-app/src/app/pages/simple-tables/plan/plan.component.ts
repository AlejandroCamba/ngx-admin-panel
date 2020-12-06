import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';

@Component({
    selector: 'plan-table',
    template: `<ngx-admin-table></ngx-admin-table>`,
})
export class PlanComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({data: {id}, confirm}) => {
        if (window.confirm('Are you sure you want to delete?')) {
            this.loadingOn();
            this.apiService.delete(`plan/${id}`).subscribe((response) => {
                this.handleSuccessReq('Plan deleted successfully');
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
            this.apiService.post(`plan`, event.newData).subscribe((response) => {
                this.handleSuccessReq('Plan created successfully');
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
        this.apiService.put(`plan/${newData.id}`, dataCopy).subscribe((response) => {
            this.handleSuccessReq('Plan updated successfully');
            confirm.resolve();
        }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    } else {
        confirm.reject();
    }
    }

    ngAfterViewInit() {
        this.setTitle('Plans');
        this.loadTableColumns({
            id: {
                title: 'ID',
                type: 'number',
            },
            name: {
                title: 'Name',
                type: 'string',
            },
            price: {
                title: 'Price',
                type: 'number',
            },
            gamePrice: {
                title: 'Game Price',
                type: 'number',
            },
            priceCurrency: {
                title: 'Currency',
                type: 'html',
                editor: {
                  type: 'list',
                  config: {
                    list: [
                      {value: 'USD', title: 'USD'}
                    ],
                  },
                }
              },
            gamePriceCurrency: {
                title: 'Game Currency',
                type: 'html',
                editor: {
                  type: 'list',
                  config: {
                    list: [
                      {value: 'Gold', title: 'Gold'}
                    ],
                  },
                }
              }
        });

        this.apiService.get('plan').subscribe((plans) => {
            this.loadDataSource(
                plans.map((plan) => {
                    delete plan.createdAt;
                    delete plan.updatedAt;
                    return plan;
                })
            );
        }, (err) => this.handleErrorReq(err.message), () => this.loadingOff());
    }
}
