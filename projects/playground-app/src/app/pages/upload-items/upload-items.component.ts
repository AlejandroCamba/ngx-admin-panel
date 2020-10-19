import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { tableData } from '../../data/smart-table';
import { AdminTableComponent } from '@admin-panel/components';
import { ApiService } from '../../http/services/api.service';
import { fromEvent } from 'rxjs';
import { map, concatMap, filter, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ngx-upload-items-table',
    templateUrl: './upload-items.component.html',
    styleUrls: ['./upload-items.component.scss'],
})
export class UploadItemsComponent extends AdminTableComponent implements AfterViewInit {
    game_console_server_relation = '';
    items = '';
    fileUploaded = false;

    alert_message;
    alert_type;

    @ViewChild('uploadItems') submitItems: ElementRef;
    submitEvent$;

    constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        this.submitEvent$ = fromEvent(this.submitItems.nativeElement, 'click')
            .pipe(
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
                concatMap(() => {
                    return this.apiService.post('game-item/item-upload', {
                        consoleToServerToGame: [this.game_console_server_relation],
                        items: JSON.parse(this.items),
                    });
                })
            )
            .subscribe((res) => {
                this.fileUploaded = true;

                this.alert_message = `${res.length} new items were created!`;
                this.alert_type = 'success';

                this.cdr.detectChanges();
                this.fileUploaded = false;
            });
    }
}
