import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { localStorageService } from '../services/local-reviews';
import * as review from '../actions/review';
import { Review } from '../models/review';

@Injectable()
export class ReviewEffects {

    @Effect()
    get$: Observable<Action> = this.actions$
    .ofType(review.LOAD)
    .startWith(new review.LoadAction())
    .switchMap(() => {
        return this.localReviewsService.getReviews()
        .map((reviews: Review[]) => new review.LoadActionSuccess(reviews))
        .catch(() => of(new review.LoadActionSuccess([])));
    });


    @Effect()
    add$: Observable<Action> = this.actions$
    .ofType(review.ADD)
    .map((action: review.AddAction) => action.payload)
    .mergeMap(newReview => {
        return this.localReviewsService.addReview(newReview)
        .map((newReview: Review) => new review.AddActionSuccess(newReview))
        .catch(() => of(new review.AddActionFail(newReview)));
    });

    @Effect()
    update$: Observable<Action> = this.actions$
    .ofType(review.UPDATE)
    .map((action: review.UpdateAction) => action.payload)
    .mergeMap(updateReview => {
        return this.localReviewsService.updateReview(updateReview)
        .map((updateReview: Review) => new review.UpdateActionSuccess(updateReview))
        .catch(() => of(new review.UpdateActionFail(updateReview)));
    });

    @Effect()
    delete$: Observable<Action> = this.actions$
    .ofType(review.REMOVE)
    .map((action: review.RemoveAction) => action.payload)
    .mergeMap(removingReview => {
        return this.localReviewsService.deleteReview(removingReview)
        .map((removingReview: Review) => new review.RemoveActionSuccess(removingReview))
        .catch(() => of(new review.RemoveActionFail(removingReview)));
    });




    constructor(private actions$: Actions, private localReviewsService: localStorageService) { }
}
