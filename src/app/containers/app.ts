import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Review } from '../models/review';
import * as reviewActions from '../actions/review';

import * as fromRoot from '../reducers';


@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../styles/app.sass'],
    template: `
    <h1>{{ title }}</h1>
    <reviews-list [reviews]="reviews$ | async"></reviews-list>
    <review-form (add)="add($event)" (edit)="edit($event)" [activeReview]="activeReview$ | async"></review-form>
    `
})
export class AppComponent {
    reviews$: Observable<Review[]>;
    activeReview$: Observable<Review>;
    title: string = 'Отзывы';

    constructor(private store: Store<fromRoot.State>) {
        this.reviews$ = this.store.select(fromRoot.getReviews);
        this.activeReview$ = this.store.select(fromRoot.getSelected);
    }

    add(reviewModel: Review) {
        this.store.dispatch(new reviewActions.AddAction(reviewModel));
    }

    edit(reviewModel: Review) {
        this.store.dispatch(new reviewActions.UpdateAction(reviewModel));
    }
}
