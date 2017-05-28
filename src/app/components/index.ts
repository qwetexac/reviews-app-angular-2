import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import { ReviewForm } from './review-form';
import { ReviewsList } from './reviews-list';
import { ReviewItem } from './review-item';


export const COMPONENTS = [
  ReviewForm,
  ReviewsList,
  ReviewItem
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
