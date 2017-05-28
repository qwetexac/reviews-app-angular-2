import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import { Review } from '../models/review';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@Injectable()

export class localStorageService {

    private _reviews: Review[];
    private _review: Review;

    private reviews = new Observable<Review[]>((observer: Subscriber<Review[]>) => {
        observer.next(this._reviews.sort((a, b) => b.id - a.id));
    });
    private review = new Observable<Review>((observer: Subscriber<Review>) => {
        observer.next(this._review);
    });

    getReviewsFromStorage(): Review[] {
        return JSON.parse(localStorage.getItem('reviews')) || [];
    }

    setReviewsInStorage(items: Review[]): void {
        localStorage.setItem('reviews', JSON.stringify(items));
    }

    getReviews(): Observable<Review[]> {
        this._reviews = this.getReviewsFromStorage();
        return this.reviews;
    }

    addReview(review: Review): Observable<Review> {
        let newItems = this.getReviewsFromStorage();
        newItems.push(review);
        this.setReviewsInStorage(newItems);

        this._review = review;
        return this.review;
    }

    updateReview(updatedReview: Review): Observable<Review> {
        let items = this.getReviewsFromStorage(),
        index = 0;
        for (let i = items.length - 1; i >= 0; i--) {
            if (updatedReview.id == items[i].id) {
                index = i;
            }
        }

        items.splice(index, 1, updatedReview);
        this.setReviewsInStorage(items);

        this._review = updatedReview;
        return this.review;
    }

    deleteReview(removingReview: Review): Observable<Review> {
        let items = this.getReviewsFromStorage(),
            index = 0;

        for (let i = items.length - 1; i >= 0; i--) {
            if (removingReview.id == items[i].id) {
                index = i;
            }
        }

        items.splice(index, 1);
        this.setReviewsInStorage(items);

        this._review = removingReview;
        return this.review;
    }

}