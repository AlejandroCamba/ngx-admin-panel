import { Component, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';

import { Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
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
import { debounceTime, map, take, debounce, throttle, throttleTime } from 'rxjs/operators';
import { Ability } from '@casl/ability';
import { CustomValidators } from 'ngx-custom-validators';
import {
    ValidationOptions,
    ValidatorCreator,
    ValidatorRecipe,
} from './independent-module/adapters/form-adapter.component';
import { ButtonComponent } from './independent-module/components/button.component';
import { LabelComponent } from './independent-module/components/label.component';
import { InputComponent } from './independent-module/components/input.component';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, fromEvent, from, BehaviorSubject, of } from 'rxjs';
import { DropdownComponent } from './independent-module/components/dropdown.component';
import { Chart } from 'chart.js';
import { NextPageExample } from './zxcasca/next-page.component';
import { EditFormComponent } from './zxcasca/edit-form.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    providers: [AState],
})
export class AppComponent extends BlockComponent implements AfterViewInit, OnInit {
    @Output() testEmitter = new EventEmitter();
    public pagination: Observable<number>;

    /*
     *
     *
     *  G      R      A      F     I     C     O    S
     *
     *
     */

    public graphPositionConfig = PositionFactory(new Grid());
    public graph1Config = {
        id: '1',
        type: 'bar',
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        data: [
            {
                data: [12, 19, 3, 5, 2, 3],
            },
        ],
    };

    public graph2Config = {
        id: '2',
        type: 'pie',
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        data: [
            {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    public graph3Config = {
        id: '3',
        type: 'line',
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        data: [
            {
                data: [12, 19, 3, 5, 2, 3],
                showLine: true, // overrides the `line` dataset default
            },
        ],
    };

    public graph4Config = {
        id: '4',
        type: 'line',
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        data: [
            {
                data: [12, 19, 3, 5, 2, 3],
            },
            {
                data: [23, 1, 2, 50, 6, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    /*
     *
     *
     *  T    A    B    L    E
     *
     *
     */

    public tabCssStyle: ATabViewStyle = {
        menuStyle: {
            backgroundColor: 'white',
            padding: '0',
            margin: '0',
        },
        tabStyle: {
            backgroundColor: 'white',
            color: 'black',
            fontSize: '30px',
            active: {
                color: 'white',
                backgroundColor: '#0275d8',
            },
        },
    };

    /*
     *
     *
     *  T    A    B        M    E    N    U
     *
     *
     */

    public dataSubject = new BehaviorSubject(
        this.httpClient.get('http://localhost:3000/api/campaigns?limit=5').pipe(
            map((campaigns: []) => {
                console.log('campaingnsss', campaigns);
                this.pagination = of(campaigns.length / campaigns['limit']);

                return campaigns['campaigns'].map((campaign) => {
                    return {
                        id: campaign['id'],
                        name: campaign['name'],
                        producto: campaign['product'],
                        status: campaign['status'],
                        accion: 'Eliminar',
                        editar: 'Editar',
                    };
                });
            })
        )
    );

    public data = this.dataSubject.asObservable();

    public table = {
        data: undefined,
        workflow: {
            columns: [
                {
                    mutate: true, //    input/dropdown,
                    into: InputComponent,
                    onUpdate: (id: string, value: object) => {},
                },
                {
                    mutate: true,
                    into: DropdownComponent,
                    values: ['aprobado', 'rechazado'],
                    onUpdate: (id: string, value: object) => {
                        console.log('id', id, 'obj', value);
                    },
                },
                {
                    mutate: 'none',
                },
                {
                    mutate: 'none',
                    onClick: 'onDelete',
                    onDelete: () => {},
                },
                {
                    mutate: 'none',
                    onClick: 'onNextPage',
                    nextPage: {
                        component: EditFormComponent,
                        withInputValues: [
                            {
                                name: 'name',
                            },
                            { name: 'producto' },
                            { name: 'status', values: ['APROBADO', 'PREAPROBADO', 'RECHAZADO'] },
                        ],
                    },
                },
            ],
            columnType: [
                LabelComponent,
                LabelComponent,
                LabelComponent,
                ButtonComponent,
                ButtonComponent,
            ],
        },
    };

    /*
     *
     *
     *  V    A    L    I    D    A    C    I    O    N    E    S
     *
     *
     */

    public form: ValidationOptions = {
        name: {
            required: ValidatorRecipe('Requerido 1', 'valor'),
            equal: ValidatorRecipe('no es igual a Mary', 'Mary'),
        },
        lastName: {
            required: ValidatorRecipe('Requerido 2'),
        },
        email: {
            email: ValidatorRecipe('email invalidoo'),
        },
        password: {
            required: ValidatorRecipe('Requerido 4'),
        },
        sex: {
            equal: ValidatorRecipe('Requerido 5', 'M'),
        },
    };

    title = 'playground-app';
    flexRecipe = new Flex();

    childPositionConfig = PositionFactory(new Grid());
    submitButtonConfig = PositionFactory(new Flex());
    subFormRow = PositionFactory(
        new Grid(StructureType.grid, {
            grid: {
                gridConfig: {
                    rowConfig: [],
                },
                height: 'wrap-content',
            },
        })
    );

    constructor(private httpClient: HttpClient) {
        super();
        this.childPositionConfig.contentPosition = {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 6,
                            offset: {
                                sm: 3,
                                md: 3,
                            },
                        },
                    ],
                },
                height: 'match-parent',
            },
        };

        this.graphPositionConfig.contentPosition = {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 6,
                            offset: undefined,
                        },
                    ],
                    shortcut: 'replay-last-col',
                },
                height: 'match-parent',
            },
        };
    }

    ngOnInit() {}

    ngAfterViewInit() {
        //console.log(this.currentBlock.nativeElement.children);
    }

    onSubmit() {
        console.log('submittttt');
    }

    catchFormValue(event) {}

    catchDropdown(event) {}

    test(event) {
        console.log('evt', event);
        this.dataSubject.next(
            this.httpClient
                .get(
                    `http://localhost:3000/api/campaigns?limit=5&${
                        event.name === 'pagination' ? 'page' : event.name
                    }=${event.value}`
                )
                .pipe(
                    map((campaigns: []) => {
                        this.pagination = of(campaigns.length / campaigns['limit']);
                        console.log('campaingnsss', campaigns);
                        return campaigns['campaigns'].map((campaign) => {
                            return {
                                id: campaign['id'],
                                name: campaign['name'],
                                producto: campaign['product'],
                                status: campaign['status'],
                                accion: 'Eliminar',
                                editar: 'Editar',
                            };
                        });
                    })
                )
        );
    }
}

// export class AppComponent extends AAdminState implements OnInit, OnDestroy {
//     childPositionConfig = PositionFactory(new Grid());

//     public data = [
//         {
//             a: '1',
//             b: '2',
//             c: '3'
//         },
//         {
//             a: '4',
//             b: '5',
//             c: '6'
//         }
//     ];

//     constructor(public a: AState<any>, b: AState<any>, private aRoleService: ARoleService) {
//         super(a, b);

//         // this.aRoleService.workflowRules = {
//         //     role1: {
//         //         actions: [
//         //             { subject: 'test1', actions: ['doSomething', 'doSomething2'] },
//         //             { subject: 'test3', actions: ['doSomething3'] }
//         //         ]
//         //     },
//         //     role2: {
//         //         actions: [{ subject: 'test2', actions: 'create' }]
//         //     }
//         // };

//         // this.aRoleService.loadRoleWorkflow('role1');
//     }

//     public tabCssStyle: ATabViewStyle = {
//         menuStyle: {
//             backgroundColor: 'white',
//             padding: '0',
//             margin: '0'
//         },
//         tabStyle: {
//             backgroundColor: 'white',
//             color: 'black',
//             width: '100%',
//             fontSize: '30px',
//             active: {
//                 color: 'white',
//                 backgroundColor: 'rgba(1,1,1,0.5)'
//             }
//         }
//     };

//     ngOnInit() {
//         this.setState({
//             fromAppComponent: 'from AppComponent!'
//         });
//         // this.getState()
//         //     .pipe(debounceTime(3000))
//         //     .subscribe(updatedState => {
//         //         console.log('Parent state', updatedState);
//         //     });
//     }

//     ngOnDestroy() {}
// }
