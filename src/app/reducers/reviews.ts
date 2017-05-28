import { createSelector } from 'reselect';
import { Review } from '../models/review';
import * as review from '../actions/review';


export interface State {
    ids: number[];
    entities: { [id: number]: Review };
    selectedReview: number;
};

export const initialState: State = {
    ids: [],
    entities: {},
    selectedReview: 0
};

export function reducer(state = initialState, action: review.Actions): State {
    console.log(action);
    switch (action.type) {

        case review.LOAD_SUCCESS: {
            const newReviews = action.payload;
            const newReviewsEntities = newReviews.reduce((entities: { [id: number]: Review }, review: Review) => {
                return Object.assign(entities, {
                    [review.id]: review
                });
            }, {});

            return Object.assign({}, state, {
                ids: newReviews.map(review => review.id),
                entities: Object.assign({}, state.entities, newReviewsEntities)
            });
        }

        case review.ADD_SUCCESS: {
            let review = action.payload;

            return Object.assign({}, state, {
                ids: [ review.id, ...state.ids ],
                entities: Object.assign({}, state.entities, {
                    [review.id]: review
                })
            });
        }

        case review.UPDATE_SUCCESS: {
            let review = action.payload;

            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, {
                    [review.id]: review
                }),
                selectedReview: 0
            });
        }

        case review.REMOVE_SUCCESS: {
            let review = action.payload;

            return Object.assign({}, state, {
                ids: state.ids.filter(id => id !== review.id),
                entitites: Object.keys(state.entities).reduce((result, key) => {
                    if (+key !== review.id) {
                        result[key] = state.entities[key];
                    }
                    return result;
                }, {}),
                selectedReview: 0
            });
        }

        case review.SELECT: {
            return Object.assign({}, state, {
                selectedReview: action.payload
            });
        }

        default: {
            return state;
        }
    }
}

export const getEntities = (state: State) => state.entities;
export const getReviewsIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedReview;