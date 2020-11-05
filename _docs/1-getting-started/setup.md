---
title: Setup
category: I. Getting Started
order: 2
---

### Choose your host component.

To define an Admin Panel application, extend the component class that you'd like to pick as the host with the `AdminApp` class.

For example in a newly created project, using AppComponent as the base class:

```js
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AdminApp {
      public menu = [];

    ngAfterViewInit() {
        this.build();
    }
}
```

The AdminApp class defines the core functionalites needed to manage the admin application frontend wise.

### Giving AdminApp a place to live
To let the `AdminApp` class know where he will be loading and getting all his stuff from, use the ngxAdminMain directive along with the menu items:

```html
  <ng-template ngxAdminMain [menuItems]="menu"></ng-template>
```

### Our application running

![Empty App](../images/emptyapp.png)

### Choose Menu Items
The ones what you'd like to be loaded as your side menu.

```js
const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        link: 'pages/dashboard',
        icon: 'home-outline'
    },
    {
        title: 'Users',
        link: 'pages/users',
        icon: 'person-outline'
    },
    {
        icon: 'layout-outline',
        title: 'Simple Tables',
        link: 'pages/simple-tables',
    },
];
```

You can use any of the [Eva icons](https://akveo.github.io/eva-icons/#/) from Akveo, just type in the name of the icon.

The application with the new menu: 

![Simple App](../images/simpleapp.png)
