import { ViewChild, ElementRef } from '@angular/core';
import { BlockDirective } from './directives/block.directive';
import { noop } from 'rxjs';
import { Grid } from './factories/families/grid/grid.model';
import { Flex } from './factories/families/flex/flex.model';
import { FlexGrid } from './factories/families/flex-grid/flex-grid.model';
import { Block } from './factories/families/block/block.model';

export abstract class BlockComponent {
    private parentBlock: ElementRef<HTMLElement>;

    @ViewChild(BlockDirective)
    set parentBlockRef(blockRef: BlockDirective) {
        this.parentBlock = blockRef.elementRef;

        if (blockRef.config instanceof Grid) {
            const gridConfig = blockRef.config.contentPosition.grid.gridConfig;

            const wrapper = document.createElement('div'); // creation of block wrapper (container)

            // configuration of wrapper classes
            wrapper.classList.add(...['container', 'p-0', 'h-100']);
            this.parentBlock.nativeElement.parentNode.insertBefore(
                wrapper,
                this.parentBlock.nativeElement
            );

            // actual wrapping of row
            wrapper.appendChild(this.parentBlock.nativeElement);

            /*
            *  
            * 
                Parent aligment
            * 
            * 
            */
            this.parentBlock.nativeElement.classList.add(...['row']);
            gridConfig.align
                ? this.parentBlock.nativeElement.classList.add(...['h-100', gridConfig.align])
                : noop;

            /*
            *  
            * 
                Parent justify
            * 
            * 
            */
            gridConfig.justify
                ? this.parentBlock.nativeElement.classList.add(gridConfig.justify)
                : noop;

            for (let i = 0; i < this.parentBlock.nativeElement.children.length; i++) {
                let size: string[] = [];
                if (gridConfig.rowConfig.length === 0) {
                    // no specification for row columns in grid config
                    // equally assign columns
                    size.push('col');
                } else {
                    if (gridConfig.rowConfig[i]) {
                        size = ['col-' + gridConfig.rowConfig[i].defaultSize];

                        /*
                        *  
                        * 
                            Children aligment
                        * 
                        * 
                        */
                        gridConfig.rowConfig[i].align
                            ? (() => {
                                  this.parentBlock.nativeElement.classList.add(...['h-100']);
                                  size.push(gridConfig.rowConfig[i].align);
                              })()
                            : noop;

                        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(breakpoint => {
                            if (gridConfig.rowConfig[i][breakpoint]) {
                                if (gridConfig.rowConfig[i][breakpoint]['resizeTo'])
                                    size.push(
                                        `col-${breakpoint === 'xs' ? '' : breakpoint + '-'}` +
                                            gridConfig.rowConfig[i][breakpoint]['resizeTo']
                                    );

                                size.push(
                                    gridConfig.rowConfig[i][breakpoint]['hide']
                                        ? `d-${breakpoint === 'xs' ? '' : breakpoint + '-'}none`
                                        : `d-${breakpoint === 'xs' ? '' : breakpoint + '-'}block`
                                );
                            }
                        });
                    } else {
                        // if there's more childrens than specified columns read shortcuts and perform actions
                        switch (gridConfig.shortcut) {
                            case 'replay-first-col': {
                                size.push('col-' + gridConfig.rowConfig[0].defaultSize);
                                break;
                            }
                            case 'replay-last-col': {
                                size.push(
                                    'col-' +
                                        gridConfig.rowConfig[gridConfig.rowConfig.length - 1]
                                            .defaultSize
                                );
                                break;
                            }
                            case 'fill-with-auto': {
                                size.push('col-auto');
                                break;
                            }
                            default: {
                                // no shortcut specified
                                // equally distribute the rest of the columns i = 0 1 2 3
                                size.push('col');
                            }
                        }
                    }
                }
                console.log('size', size);
                this.parentBlock.nativeElement.children[i].classList.add(...size);
                this.parentBlock.nativeElement.children[i]['style'].border = '1px solid';
            }
        } else if (blockRef.config instanceof Flex) {
            this.parentBlock.nativeElement.classList.add(
                'd-flex',
                blockRef.config.contentPosition.flex
            );
            this.parentBlock.nativeElement.style.height = '100%';
            this.parentBlock.nativeElement.style.border = '1px solid';
        } else if (blockRef.config instanceof FlexGrid) {
        } else if (blockRef.config instanceof Block) {
        }
    }

    get currentBlock(): ElementRef<HTMLElement> {
        return this.parentBlock;
    }
}
