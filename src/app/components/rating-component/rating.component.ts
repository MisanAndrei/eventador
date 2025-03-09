import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category, Review, ReviewMapped, SendResponse } from '../../Models/Models';
import { ApiService } from '../../Services/ApiService';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() ratings!: Review[];
  @Input() categories!: Category[];
  @Input() profileId!: number;
  @Input() currentProfileLoggedIn!: boolean;

  ratingsMapped!: ReviewMapped[];
  showAllReviews: boolean = false;
  reviewsNumber: number = 0;
  


    isMobile: Observable<boolean>;
    constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
          map(result => result.matches)
        );
    }
  ngOnInit(): void {
    this.mapReviewsToCurrentModel(this.ratings);
    console.log(this.currentProfileLoggedIn);
  }

  mapReviewsToCurrentModel(ratings: Review[]){
    this.ratingsMapped = ratings.map((rating: Review) => {
      return {
        authorName: rating.authorName,
        id: rating.id,
        responseText: rating.responseText,
        responseTextToSend: '',
        reviewText: rating.reviewText,
        score: rating.score,
        creationDate: rating.creationDate,
        responseToBeSent: false,
        responseShown: true,
        categoryName: rating.category.name,
        responseInApproval: false,
        responseSent: false
      };
      
      
    });
    this.reviewsNumber = this.ratingsMapped.length;
  }
    
  getStarValues(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getReviewsByProfileId(){
    this.apiService.getReviewsByProfileId(this.profileId).subscribe(reviews => {
      this.mapReviewsToCurrentModel(reviews);
      this.showAllReviews = true;
    });
  }

  sendResponse(id: number, responseText?: string){
    
    var reviewResponse = {
      reviewId: id,
      responseText: responseText
    } as SendResponse;

    this.apiService.saveResponse(reviewResponse).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error('Error saving review:', error);
        // Handle error
      }
    });

    this.ratingsMapped = this.ratingsMapped.map((obj) => {
      // Change the value for the object with id 2
      if (obj.id === id) {
        return { ...obj, responseSent: true };
      }
      return obj;
    });
  }

  showResponse(review: ReviewMapped){
    this.ratingsMapped = this.ratingsMapped.map((obj) => {
      // Change the value for the object with id 2
      if (obj.id === review.id) {
        return { ...obj, responseShown: true };
      }
      return obj;
    });
  }

  showResponseArea(review: ReviewMapped){
    review.responseToBeSent = true;
  }
}