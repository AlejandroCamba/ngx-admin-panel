import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { OnCreate } from './interfaces/on-create.interface';
import { OnUpdate } from './interfaces/on-update.interface';
import { OnDelete } from './interfaces/on-delete.interface';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
    selector: 'ngx-admin-table',
    template: `
        <nb-card [nbSpinner]="loading" nbSpinnerStatus="primary">
            <nb-card-header>
                {{ title }}
            </nb-card-header>

            <nb-card-body>
                <ng2-smart-table
                    [settings]="settings"
                    [source]="source"
                    (deleteConfirm)="onDeleteConfirm($event)"
                    (createConfirm)="onCreateConfirm($event)"
                    (editConfirm)="onSaveConfirm($event)"
                >
                </ng2-smart-table>
            </nb-card-body>
        </nb-card>
    `,
    styles: [``],
})
export class TableComponent implements OnCreate, OnDelete, OnUpdate, OnChanges {
    title: string;
    loading = true;

    settings = {
        add: {
            addButtonContent: '<i class="eva eva-plus-outline"></i>',
            createButtonContent: '<i class="eva eva-checkmark-outline"></i>',
            cancelButtonContent: '<i class="eva eva-close-outline"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="eva eva-edit-outline"></i>',
            saveButtonContent: '<i class="eva eva-checkmark-outline"></i>',
            cancelButtonContent: '<i class="eva eva-close-outline"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="eva eva-trash-outline"></i>',
            confirmDelete: true,
        },
    };

    source: LocalDataSource;

    onDeleteConfirm = (evt: Event) => {};

    onCreateConfirm = (evt: Event) => {};

    onSaveConfirm = (evt: Event) => {};

    constructor(private toastrService: NbToastrService) {}

    ngOnChanges(sc: SimpleChanges) {
        console.log('changes: ', sc.source);
    }

    showToast(status: NbComponentStatus, message) {
        this.toastrService.show(status, message, { status, destroyByClick: true });
    }
}
