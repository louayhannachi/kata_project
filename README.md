# KataCaa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Project structure

src
├── app
│   ├── core
│   │   ├── guards       // Guards to protect routes
│   │   ├── interceptors // HTTP interceptors
│   │   ├── models       // Data models/interfaces
│   │   └── services     // Global services
│   ├── modules
│   │   ├── feature1     // Feature module 1 
│   │   │   ├── components // Components specific to Feature 1
│   │   │   ├── services   // Services specific to Feature 1
│   │   │   └── feature1.module.ts // Module file for Feature 1
│   │   ├── feature2     // Feature module 2 
│   │   │   ├── components // Components specific to Feature 2
│   │   │   ├── services   // Services specific to Feature 2
│   │   │   └── feature2.module.ts // Module file for Feature 2
│   │   └── ...           // Additional feature modules
│   ├── shared
│   │   ├── components   // Reusable components 
│   │   ├── directives   // Reusable directives
│   │   ├── pipes        // Reusable pipes
│   │   ├── models       // Shared models/interfaces
│   │   └── services     // Shared services 
│   ├── app-routing.module.ts // Main routing module
│   ├── app.component.html   // Root component template
│   ├── app.component.ts     // Root component logic
│   ├── app.component.css    // Root component styles
│   └── app.module.ts        // Root module file
├── assets                    // Static assets (e.g., images, JSON files)
├── environments              // Environment-specific configuration
└── ...

## Naming
Every obsevable name will be followed by $ to distinguish them from other variables.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

