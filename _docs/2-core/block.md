---
title: Block
category: II. Core
order: 1
---

The Block was designed under the influence of the factory method design pattern to provide flexible positioning options to HTML elements within Angular templates. Enabling it to support any positioning solution that could be abstracted into this library. Currently only Bootstrap 4's Grid and Flex positioning systems are supported.

### Example Layout

```js
@Component({
  selector: 'layout',
  template: `
  <div ngxBlock>
    <ng-content></ng-content>
  </div>`
})
export class Layout extends BlockComponent {}
```

> NOTE: There is no need to create layouts, you can use the BlockComponent class and directive directly in any of your Angular components but if you find yourself using the same positioning configuration over a lot of templates, i find layouts defined like this to be benefitial :)

### Layout usage

```html
<layout>
  <users-table></users-table>
  <transactions-table></transactions-table>
</layout>
```

By default, `BlockComponent` uses Bootstrap 4's grid system without any specific column width, using an auto width on each new added element.

If you would to create two tables and no block configuration is passed, they would be placed one next to the other.

### Providing a configuration

To provide responsive behaviour, you could provide a configuration object via the `config` property.

```js
@Component({
  selector: 'layout',
  template: `
  <div ngxBlock [config]="layoutConfig">
    <ng-content></ng-content>
  </div>`
})
export class Layout extends BlockComponent {
  public layoutConfig = PositionFactory(
        new Grid(StructureType.grid, {
            grid: {
                gridConfig: {
                    rowConfig: [
                        {
                            defaultSize: 6,
                        }
                    ],
                },
                height: 'match-parent',
            },
        })
    );
}
```

### Properties

```js
RowConfig {
    defaultSize: ColSize;
    xs?: Col;
    sm?: Col;
    md?: Col;
    lg?: Col;
    xl?: Col;
    offset?: {
        xs?: ColSize;
        sm?: ColSize;
        md?: ColSize;
        lg?: ColSize;
        xl?: ColSize;
    };
    align?: ColAlign;
}
```

`ColSize` are values from 1 to 12

For `Col` values you can either use 

```js
{
  hide: boolean
}
```

or

```js
{
  resizeTo: ColSize
}
```

But it won't allow specifying both as hiding while resizing doesn't make much sense!
