import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../models/review';

class ReviewModel implements Review {
	constructor(
		public id: number = 0,
		public author: string = '',
		public tel: string = '',
		public text: string = '',
		public date: number = 0,
	) {}
}

const TEXT_LIMIT: number = 256;

@Component({
  selector: 'review-form',
  templateUrl: '../templates/review-form.html',
  styleUrls: ['../styles/review-form.sass']
})
export class ReviewForm {
	@Input() activeReview: Review = new ReviewModel();
	@Output() add = new EventEmitter<Review>();
	@Output() edit = new EventEmitter<Review>();

	model: Review;

	textLeft: number;

	submit(form) {
		if (this.model.id > 0) {
			this.edit.emit(this.model);
			form.reset();
			return;
		}
		
		this.model.id = this.model.date = +new Date();
		this.add.emit(this.model);
		form.reset();
	}

	onTextChange(e) {
		let text = e.target.value;
		if (text.length >= TEXT_LIMIT) {
			this.model.text = this.model.text.slice(0, TEXT_LIMIT);
			this.textLeft = 0;
			return;
		}
		this.textLeft = TEXT_LIMIT - text.length;
	}

	ngOnChanges() {
		this.model = Object.assign(new ReviewModel(), this.activeReview);	
		this.textLeft = TEXT_LIMIT - this.model.text.length;
	}
}
