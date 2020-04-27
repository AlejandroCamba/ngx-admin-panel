import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { NextPageAbstract } from '../container/next-page/next-page-abstract.component';
import {
    ValidatorRecipe,
    ValidationOptions,
} from '../independent-module/adapters/form-adapter.component';
import {
    AAdminState,
    AState,
    ARoleService,
    PositionFactory,
    Grid,
    BlockComponent,
    Flex,
    StructureType,
} from '@admin-panel/core';

@Component({
    selector: 'edit-form',
    template: `
        <next-page (returnToMain)="toggleLastScreen($event)">
            <admin-form
                block
                *ngIf="name"
                [config]="childPositionConfig"
                (submitFormValue)="catchFormValue($event)"
            >
                <form-adapter [name]="'Name'" [validators]="form.name">
                    <default-input [value]="name"></default-input>
                </form-adapter>
                <form-adapter [name]="'Product'" [validators]="form.product">
                    <default-input [value]="producto"></default-input>
                </form-adapter>
                <form-adapter [name]="'Status'" [validators]="form.status">
                    <default-dropdown [value]="status"></default-dropdown>
                </form-adapter>
                <div block [config]="submitButtonConfig">
                    <default-button [value]="'Enviar'" type="'submit'"></default-button>
                </div>
            </admin-form>
        </next-page>
    `,
    styles: [``],
})
export class EditFormComponent extends NextPageAbstract implements OnInit {
    @Input() name;
    @Input() producto;
    @Input() status;

    public form: ValidationOptions = {
        name: {
            required: ValidatorRecipe('Requerido 1', 'valor'),
            equal: ValidatorRecipe('no es igual a Mary', 'Mary'),
        },
        product: {
            required: ValidatorRecipe('Producto requerido'),
        },
        status: {
            required: ValidatorRecipe('requerido'),
        },
    };

    submitButtonConfig = PositionFactory(new Flex());

    childPositionConfig = PositionFactory(
        new Grid(StructureType.grid, {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 8,
                            offset: {
                                sm: 2,
                                md: 2,
                            },
                        },
                    ],
                },
                height: 'match-parent',
            },
        })
    );

    ngOnInit() {}

    catchFormValue(event) {}
}
