import {
    Component,
    OnInit,
    Input,
    ComponentRef,
    ViewChild,
    ViewContainerRef,
    Directive,
    HostListener,
    ComponentFactory
} from '@angular/core';

@Directive({
    selector: '[appClickHandler]'
})
export class ClickHandlerDirective {
    @HostListener('childValueChanged', ['$event']) log(e) {
        console.log(e);
    }
}

@Component({
    selector: 'table-adapter',
    template: `
        <div
            tabindex="1"
            (focusout)="handleBlur()"
            style="height: 50px;"
            class=""
            [ngStyle]="{'display': display ? 'block': 'none'}"
        >
            <ng-container #vc></ng-container>
        </div>
    `,
    styles: [
        `
            div:focus {
                outline: none;
            }
        `
    ]
})

export class TableAdapterComponent implements OnInit {
    @ViewChild('vc', { static: true, read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    public adaptedComponentRef: ComponentRef<unknown>;

    public onBlurCallback: () => void;
    public myOwnReference: ComponentRef<unknown>;

    public display = false;

    @Input() tableContainer: any;
    @Input() keyInTableContainer: string; // ex. 1-nombre

    @Input() tableData: {
        data: any[];
        index: number;
        label: string;
    };
    
    multipleValues: string[];

    ngOnInit() {
      this.adaptedComponentRef.instance['value'] = this.multipleValues ? this.multipleValues :this.tableData.data[this.tableData.index][this.tableData.label];
    }

    createComponent(factory: ComponentFactory<unknown>): ComponentRef<unknown> {
      this.adaptedComponentRef = this.viewContainerRef.createComponent(factory);
      return this.adaptedComponentRef;
    }

    handleBlur() {
        if (this.onBlurCallback) {
            this.onBlurCallback();
            this.myOwnReference.destroy();
        }
    }
}
