import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../models/review';
import * as moment from 'moment';
import 'moment/locale/ru';

const TIME_MAX_DIFF: number = 60*30 * 1000; //полчаса

@Component({
  selector: 'review-item',
  templateUrl: '../templates/review.html',
  styleUrls: ['../styles/review.sass'],
})

export class ReviewItem {
	@Input() review: Review;
	@Output() edit = new EventEmitter<Review>();
	@Output() delete = new EventEmitter<Review>();

	get date() {
		let now = +new Date();
		if (now - this.review.date < TIME_MAX_DIFF) {
			return moment(this.review.date).fromNow();
		}
        return moment(this.review.date).format('Do MMMM в H:mm');
	}

	get text() {
		return this.review.text;
	}

	get author() {
		return this.review.author;
	}


	constructor () { moment().locale('ru'); }
}
