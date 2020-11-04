import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { ApiService } from '../../http/services/api.service';
import { fromEvent, Observable } from 'rxjs';
import { concatMap, filter, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ngx-upload-prices-table',
    templateUrl: './upload-prices.component.html',
    styleUrls: ['./upload-prices.component.scss'],
})
export class UploadPricesComponent extends AdminTableComponent implements AfterViewInit {
    @ViewChild('prices') submitPrices: ElementRef;

    game_console_server_relation = '';

    selectedItem = 'NONE';
    fileToUpload: File = null;
    fileUploaded = false;
    selectedFiles: FileList;

    alert_message;
    alert_type;

    qualities = ['NONE', 'NORMAL', 'FINE', 'SUPERIOR', 'EPIC', 'LEGENDARY'];

    submitPrices$: Observable<any>;

    constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        console.log(this.submitPrices.nativeElement);
        this.submitPrices$ = fromEvent(this.submitPrices.nativeElement, 'click').pipe(
            debounceTime(2000),
            filter(() => {
                if (!/\d/.test(this.game_console_server_relation)) {
                    this.fileUploaded = true;

                    this.alert_message = 'Invalid foreign key!';
                    this.alert_type = 'warning';

                    this.cdr.detectChanges();
                    this.fileUploaded = false;
                }

                return /\d/.test(this.game_console_server_relation);
            }),
            concatMap((evt) => {
                console.log(evt);
                const formData = new FormData();

                formData.append('file', this.fileToUpload, this.fileToUpload.name);

                if (this.selectedItem !== 'NONE') {
                    formData.append('quality', this.selectedItem);
                }

                const headers = new Headers();
                headers.append('Content-Type', 'multipart/form-data');
                headers.append('Accept', 'application/json');

                return this.apiService.post(
                    this.selectedItem === 'NONE'
                        ? `price/upload/${this.game_console_server_relation}`
                        : `price/upload-with-params/${this.game_console_server_relation}`,
                    formData,
                    headers
                );
            })
        );

        this.submitPrices$.subscribe((response) => {
            this.fileUploaded = true;
            const responseString = JSON.stringify(response);

            navigator.clipboard
                .writeText(responseString)
                .then(() => {
                  this.fileUploaded = true;
                  this.alert_message =
                  'Fallback: Copying text command was Successful';
                  this.alert_type = 'success';

                  this.cdr.detectChanges();
                  this.fileUploaded = false;
                })
                .catch((error) => {
                  this.fileUploaded = true;
                  this.alert_message =
                  'Error ocurred copying to clipboard ' + error;
                  this.alert_type = 'danger';
                  this.cdr.detectChanges();
                  this.fileUploaded = false;
                });
        });
    }

    onFileChanged(event) {
        this.selectedFiles = event.target.files;
        this.fileToUpload = this.selectedFiles.item(0);
    }
}
