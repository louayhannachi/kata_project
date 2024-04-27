import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';

// Register the locale data for 'fr'
registerLocaleData(localeFr);

// Set the locale to 'fr' for all tests
TestBed.configureTestingModule({
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }]
});