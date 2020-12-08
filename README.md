# Angular Admin Panel Generator

This document contains development information to reproduce the project locally, for usage documentation go to [the documentation site](https://alejandrocamba.github.io/ngx-admin-panel/)
  
This was actually a thesis project but since it was really useful and a time saver specially for personal projects, i updated it to use @akveo Ngx-admin in combination with @Nebular css library, this framework looks great and it's pretty straight forward as well, [One of my personal project uses it](https://www.theelderscrollsonline.gameitemprices.com), if something is missing (there are plenty of missing features, i'll be adding some issues and features when i have some time too), feel free to PR it.

## Running it locally

###  Install and Build
 1. `npm i`
 2. `npm run build-all`

### Linking to playground-app and build

 1. Go to `dist/admin-panel/core`
 2. run `npm link`
 3. Go to `dist/admin-panel/components`
 4. run `npm link`
	 
#### In the playground app:
 5.   `npm link @ngx-admin-panel/core`
 6.  `npm link @ngx-admin-panel/components`


### Fixing compiling errors

 1. If you encounter any errors regarding relative imports to the `core` library (check in issues), go to `dist/admin-panel/components` and replace the conflicting import for `import('@ngx-admin-panel/core')`
 2.  Nebular style files are not included in the building process yet (check in issues), add them manually the first time: Copy and paste styles missing inside @theme folder into the same respective folder in `dist`.


Run `npm ` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

  

## Starting the application

  Open 3 terminals:

 1. run `npm run build-core`
 2. run `npm run build-components`
 3. Wait for each library to compile and run `npm start`

You can now use the libraries in the playground-app and watch for file changes in all 3 projects at the same time.

## Committing
Run `npm run commit` to run [commitizen](https://github.com/commitizen/cz-cli). Beware, the code should be able to be linted and pass tslint parameters before pushing to master.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
