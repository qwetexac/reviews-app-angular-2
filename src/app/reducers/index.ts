import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

import { combineReducers } from '@ngrx/store';

import * as fromReviews from './reviews';


export interface State {
	reviews: fromReviews.State;
}

const reducers = {
	reviews: fromReviews.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	if (environment.production) {
		return productionReducer(state, action);
	} else {
		return developmentReducer(state, action);
	}
}

export const getBooksState = (state: State) => state.reviews;

export const getReviewsEntities = createSelector(getBooksState, fromReviews.getEntities);
export const getReviewsIds = createSelector(getBooksState, fromReviews.getReviewsIds);
export const getSelectedId = createSelector(getBooksState, fromReviews.getSelectedId);


export const getReviews = createSelector(getReviewsEntities, getReviewsIds, (entities, ids) => {
	return ids.map(id => entities[id]);
});

export const getSelected = createSelector(getReviewsEntities, getSelectedId, (entities, id) => {
	return entities[id] || {};
});