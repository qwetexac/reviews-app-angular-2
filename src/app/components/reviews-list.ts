import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../models/review';
import * as reviewActions from '../actions/review';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'reviews-list',
  template: `
	<review-item *ngFor="let review of reviews" [review]="review" (edit)="select($event);" (delete)="delete($event);"></review-item>
  `,
})
export class ReviewsList {
  @Input() reviews: Review[];
  
  select(review: Review) {
  	this.store.dispatch(new reviewActions.SelectAction(review.id));
  }

  delete(review: Review) {
  	this.store.dispatch(new reviewActions.RemoveAction(review));
  }

  constructor(private store: Store<fromRoot.State>) { }
}
