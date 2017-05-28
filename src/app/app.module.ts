import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MultiEventPlugin } from 'angular2-multievent-bindings-plugin';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ReviewEffects } from './effects/review';

import { ComponentsModule } from './components';

import { AppComponent } from './containers/app';

import { localStorageService } from './services/local-reviews';

import { reducer } from './reducers';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ComponentsModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ReviewEffects)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    localStorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }