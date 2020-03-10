/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Input, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[ATab]'
})
export class TabDirective {
    @Input('tabTitle') title: string;
    private active = false;

    constructor(private elementRef: ElementRef) {
        elementRef.nativeElement.style.display = 'none';
    }

    setActive(state: boolean) {
        this.active = state;
        this.elementRef.nativeElement.style.display = state ? 'block' : 'none';
    }

    isTabActive() {
        return this.active;
    }
}
