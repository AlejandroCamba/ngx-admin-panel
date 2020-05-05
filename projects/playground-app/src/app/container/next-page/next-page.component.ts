import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ContentChild, ViewContainerRef, AfterContentInit, Renderer2, AfterViewInit } from '@angular/core';

@Component({
    selector: 'next-page',
    template: `
        <div class="mt-3 mb-5">
            <default-button [value]="'Regresar'" [handleClick]="handleClick" [style]="nextPageStyle"></default-button>
        </div>
        <ng-content>
        </ng-content>
    `,
    styles: [``],
    providers: []
})
export class NextPageComponent {
    @Output() returnToMain = new EventEmitter<boolean>();
    
    nextPageStyle = {
        display: 'block'
    }

    constructor() {}

    handleClick = () => {
      this.returnToMain.emit(true);
    }
}
