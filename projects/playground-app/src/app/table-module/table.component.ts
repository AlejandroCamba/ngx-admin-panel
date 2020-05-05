import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChildren,
  QueryList,
  ComponentFactory,
  ComponentRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  Type
} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { fromEvent, of, BehaviorSubject, from } from 'rxjs';
import { skipUntil, tap, filter, take } from 'rxjs/operators';
import { TableAdapterComponent } from '../independent-module/adapters/table-adapter.component';
import { IndependentComponent } from '../independent-module/components/parent/independent.component';
import { BlockComponent, PositionFactory, Grid, Flex } from '@admin-panel/core';
import { FilterAdapterComponent } from '../independent-module/adapters/filter-adapter.component';
import { LabelComponent } from '../independent-module/components/label.component';

type TableInterfaceEditable = Partial<{
  body: {};
  headerRow: {};
}>;

@Component({
  selector: 'ATable',
  template: `
    <div *ngIf="displayTableView; else nextpage">
      <div block [config]="childPositionConfig">
        <div block [config]="headerPositionConfig">
          <ng-content select="[header]"></ng-content>
        </div>
        <div block class="mt-5 mb-5">
          <ngx-datatable
            #mydatatable
            [rows]="tableData"
            headerHeight="50"
            [limit]="1"
            [columnMode]="ColumnMode.force"
            [rowHeight]="'auto'"
          >
            <ng-container *ngFor="let column of labels; let i = index">
              <ngx-datatable-column
                [sortable]="false"
                name="{{ column.name | titlecase }}"
              >
                <ng-template
                  ngx-datatable-cell-template
                  let-rowIndex="rowIndex"
                  let-value="value"
                  let-row="row"
                  let-name="column.name"
                >
                  <ng-template #tablecontent></ng-template>
                </ng-template>
              </ngx-datatable-column>
            </ng-container>
          </ngx-datatable>
        </div>
      </div>
      <div block [config]="headerPositionConfig">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
    <div (returnToMain)="catch($event)">
      <ng-template #nextpage></ng-template>
    </div>
  `,
  styles: [``]
})
export class TableComponent extends BlockComponent implements OnInit {
  @Input() cssStyles: TableInterfaceEditable = {
    headerRow: {
      fontWeight: 900
    },
    body: {}
  };

  private cssRulePair: Map<keyof TableInterfaceEditable, string> = new Map([
    [
      'body',
      '.ngx-datatable .datatable-body-cell, .ngx-datatable .datatable-header-cell'
    ],
    ['headerRow', '.ngx-datatable .datatable-header .datatable-header-cell']
  ]);

  editing = {};
  rows = [];

  ColumnMode = ColumnMode;

  private indexCount = [] as string[];
  public labels: Array<{}>;
  public tableData = [];

  @Input() tableConfig: any;
  @Input() data$: any;

  private rows$ = new BehaviorSubject(null);

  public displayTableView = true;

  /* 
        Dynamic component loading properties
    */
  @ViewChildren('tablecontent', { read: ViewContainerRef })
  tableElementsContainer: QueryList<ViewContainerRef>;

  /* 
        Dynamic next page container
    */
  @ViewChild('nextpage', { read: ViewContainerRef })
  nextPageContainer: ViewContainerRef;

  childPositionConfig = PositionFactory(new Grid());

  /* header y footer por los momentos */

  headerPositionConfig = PositionFactory(new Flex());

  footerPositionConfig = PositionFactory(new Grid());
  tablePositionConfig = PositionFactory(new Grid());

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {
    super();
    this.childPositionConfig.contentPosition = {
      grid: {
        gridConfig: {
          rowConfig: [
            {
              defaultSize: 12,
              offset: undefined
            }
          ],
          shortcut: 'replay-last-col'
        },
        height: 'match-parent'
      }
    };

    this.headerPositionConfig.contentPosition.flex = 'justify-content-around';
  }

  ngOnInit() {
    this.data$.subscribe(dataObservable => {
      dataObservable.subscribe(data => {
        this.tableElementsContainer.forEach(container => {
          container.clear();
        });

        this.rows = [...data];
        this.tableData = data;
        this.indexCount = this.tableData.map(() => 'O');

        if (!this.labels) {
          data.map(data => {
            this.labels = [];
            return Object.keys(data)
              .filter(key => key !== 'id')
              .reduce((prev, curr, index) => {
                if (index === 1) {
                  this.labels.push({ name: prev });
                  prev = `${data[prev]}`;
                }
                this.labels.push({ name: curr });

                return `${prev},${data[curr]}`;
              })
              .split(',');
          });
        }

        this.rows$.next(this.labels);
      });
    });
  }

  updateValue(value, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = value ? value : this.rows[rowIndex][cell];
    this.tableData[rowIndex][cell] = value
      ? value
      : this.tableData[rowIndex][cell];
    this.rows = [...this.rows];
  }

  ngAfterViewInit() {
    this.tableElementsContainer.changes.pipe(take(1)).subscribe(value => {
      this.createComponents(value);
    });

    console.log(document.styleSheets[5] as CSSStyleSheet);
    this.findAndReplaceCssRules();
  }

  findAndReplaceCssRules() {
    let rules = (document.styleSheets[5] as CSSStyleSheet).cssRules;

    Object.keys(this.cssStyles).forEach(style => {
      const element: keyof TableInterfaceEditable = <
        keyof TableInterfaceEditable
      >style;

      for (let i = 0; i < rules.length; i++) {
        let specificRule = rules.item(i)['selectorText'];
        if (specificRule === this.cssRulePair.get(element)) {
          console.log(style);

          Object.keys(this.cssStyles[style]).forEach(key => {
            rules[i]['style'][key] = this.cssStyles[style][key];
          });
        }
      }
    });
  }

  comopnentFactoryStorage(
    ...args: any
  ): Array<ComponentFactory<unknown> | ComponentFactory<unknown>[]> {
    const factories: Array<
      ComponentFactory<unknown> | ComponentFactory<unknown>[]
    > = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Array) {
        const subComponentArray = [];
        for (let j = 0; j < args[i].length; j++) {
          subComponentArray.push(
            this.resolver.resolveComponentFactory(args[i][j])
          );
        }
        factories.push(subComponentArray);
      } else {
        factories.push(this.resolver.resolveComponentFactory(args[i]));
      }
    }
    return factories;
  }

  private createComponents(containers) {
    this.rows$
      .asObservable()
      .pipe(filter(v => v !== null))
      .subscribe((labels: []) => {
        const factories = this.comopnentFactoryStorage(
          ...this.tableConfig.workflow.columnType
        );

        const creacteComponentWithFactory = (
          factory: ComponentFactory<unknown>,
          containers,
          elementIndex?: number,
          whichContainer?: number
        ): ComponentRef<unknown> => {
          let container: ViewContainerRef;

          if (!(containers instanceof ViewContainerRef)) {
            container = containers.toArray()[
              whichContainer !== undefined
                ? whichContainer
                : creacteComponentWithFactory.unresetCounter
            ];
          } else {
            container = containers;
          }

          let adapterRef: ComponentRef<unknown>;
          let adapterFactory = this.resolver.resolveComponentFactory(
            TableAdapterComponent
          );

          if (elementIndex !== undefined) {
            adapterRef = container.createComponent(
              adapterFactory,
              elementIndex
            );
          } else {
            adapterRef = container.createComponent(adapterFactory);
          }

          const adapterInstace = adapterRef.instance as TableAdapterComponent;

          adapterInstace.myOwnReference = adapterRef;
          adapterInstace.createComponent(factory);

          return adapterRef;
        };

        creacteComponentWithFactory.unresetCounter = 0;

        for (let i = 0; i < labels.length; i++) {
          // rows
          for (let j = 0; j < this.tableData.length; j++) {
            // columns
            if (factories[i] instanceof Array) {
            } else {
              const mainAdapterRef = creacteComponentWithFactory(
                <ComponentFactory<unknown>>factories[i],
                containers
              );

              const mainAdapterDOMLocation =
                mainAdapterRef.location.nativeElement;
              const mainAdapterInstance = mainAdapterRef.instance as TableAdapterComponent;

              mainAdapterInstance.adaptedComponentRef.instance['setStyle'](this.tableConfig.workflow.columns[i].style || {})

              mainAdapterInstance.tableData = {
                data: this.tableData,
                index: j,
                label: this.labels[i]['name']
              };

              mainAdapterInstance.display = true;

              /*
               *
               *  Unmutable components event listener callbacks
               *
               */
              this.renderer.listen(
                mainAdapterInstance.adaptedComponentRef.location.nativeElement,
                'click',
                () => {
                  if (
                    this.tableConfig.workflow.columns[i]['onClick'] ===
                    'onDelete'
                  ) {
                    let pivot = 0;
                    for (let i = 0; i < j; i++) {
                      if (this.indexCount[i] === 'D') {
                        pivot++;
                      }
                    }
                    this.indexCount[j] = 'D';

                    containers.forEach((container: ViewContainerRef) => {
                      container.remove(j - pivot);
                    });

                    this.tableData.splice(j - pivot, 1);

                    this.tableConfig.workflow.columns[i][
                      this.tableConfig.workflow.columns[i].onClick
                    ]();
                  } else if (
                    this.tableConfig.workflow.columns[i]['onClick'] ===
                    'onNextPage'
                  ) {
                    let pivot = 0;
                    for (let i = 0; i < j; i++) {
                      if (this.indexCount[i] === 'D') {
                        pivot++;
                      }
                    }

                    containers.forEach((container: ViewContainerRef) => {
                      container.clear();
                    });

                    this.displayTableView = false;

                    const componentToLoad: Type<unknown> = this.tableConfig
                      .workflow.columns[i]['nextPage'].component;

                    const component = this.nextPageContainer.createComponent(
                      this.resolver.resolveComponentFactory(componentToLoad)
                    );

                    this.tableConfig.workflow.columns[i][
                      'nextPage'
                    ].withInputValues.forEach(property => {

                      if (property.values) {
                        component.instance[property.name] = property.values;
                        component.instance['selectedValue'] = this.tableData[
                          j - pivot
                        ][property.name];
                      } else {
                        component.instance[property.name] = this.tableData[
                          j - pivot
                        ][property.name];
                      }
                    });

                    component.instance['id'] = this.tableData[j - pivot]['id']; // asignacion de id para el fetch con datos de formulario
                    component.instance['middlePagerEmitter'].subscribe(
                      value => {
                        component.destroy();
                        this.displayTableView = value;
                        this.ngOnInit();
                      }
                    );
                  }
                }
              );

              /*
               *
               *  Mutable components logic handler
               *
               */
              if (this.tableConfig.workflow.columns[i].mutate !== 'none') {
                this.renderer.listen(
                  mainAdapterDOMLocation,
                  'dblclick',
                  event => {
                    let pivot = 0;
                    for (let i = 0; i < j; i++) {
                      if (this.indexCount[i] === 'D') {
                        pivot++;
                      }
                    }

                    const mutatedAdapterRef = creacteComponentWithFactory(
                      this.resolver.resolveComponentFactory(
                        TableAdapterComponent
                      ),
                      containers,
                      j - pivot,
                      i
                    );

                    const mutatedAdapterInstance = mutatedAdapterRef.instance as TableAdapterComponent;

                    mutatedAdapterInstance.display = true;
                    mainAdapterInstance.display = false;

                    const mutatedComponent = mutatedAdapterInstance.createComponent(
                      this.resolver.resolveComponentFactory(
                        this.tableConfig.workflow.columns[i].into
                      )
                    );

                    const mutatedComponentInstance = mutatedComponent.instance as IndependentComponent;

                    mutatedAdapterInstance.tableData = {
                      data: this.tableData,
                      index: j - pivot,
                      label: this.labels[i]['name']
                    };

                    mutatedAdapterInstance.multipleValues = this.tableConfig.workflow.columns[
                      i
                    ].values;
                    mutatedAdapterInstance.myOwnReference = mutatedAdapterRef;

                    mutatedAdapterInstance.onBlurCallback = () => {
                      if (mutatedComponentInstance['dirty']) {
                        this.updateValue(
                          mutatedComponentInstance.value,
                          this.labels[i]['name'],
                          j - pivot
                        );

                        this.tableConfig.workflow.columns[i]['onUpdate'](
                          this.tableData[j]['id'],
                          this.tableData[j]
                        );
                      } else {
                        this.updateValue(
                          undefined,
                          this.labels[i]['name'],
                          j - pivot
                        );
                      }

                      mutatedAdapterInstance.myOwnReference.destroy();
                      mainAdapterInstance.display = true;
                    };

                    mutatedComponentInstance.childValueChanged.subscribe(
                      event => {
                        mainAdapterInstance.adaptedComponentRef.instance[
                          'value'
                        ] = event.value;
                        mutatedAdapterInstance.adaptedComponentRef.instance[
                          'value'
                        ] = event.value;
                      }
                    );

                    this.editing[j + '-' + this.labels[i]['name']] = true;
                  }
                );
              }
            }
          }
          creacteComponentWithFactory.unresetCounter++;
        }
      });
  }

  test(event) {
    this.rows$.next(event);
  }

  catch(event) {
    alert(event);
  }
}
