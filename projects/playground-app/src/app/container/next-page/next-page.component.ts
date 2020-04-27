import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ContentChild, ViewContainerRef, AfterContentInit, Renderer2, AfterViewInit } from '@angular/core';

@Component({
    selector: 'next-page',
    template: `
        <div class="mt-3 mb-5">
            <default-button [value]="'Regresar'" [handleClick]="handleClick"></default-button>
        </div>
        <ng-content>
        </ng-content>
    `,
    styles: [``],
    providers: []
})
export class NextPageComponent implements OnInit, AfterContentInit, AfterViewInit {
    @Output() returnToMain = new EventEmitter<boolean>();
   
    constructor(private r2: Renderer2) {
      
    }

    ngOnInit() {
      
    }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {
    }

    handleClick = () => {
      this.returnToMain.emit(true);
    }
}
