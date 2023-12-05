import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Review, ReviewMapped, SendResponse } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() ratings!: Review[];
  @Input() profileId!: number;
  @Input() currentProfileLoggedIn!: boolean;

  ratingsMapped!: ReviewMapped[];
  showAllReviews: boolean = false;
  


    isMobile: Observable<boolean>;
    constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
          map(result => result.matches)
        );
    }
  ngOnInit(): void {
    this.ratingsMapped = this.ratings.map((rating: Review) => {
      return {
        authorName: rating.authorName,
        id: rating.id,
        responseText: rating.responseText,
        reviewText: rating.reviewText,
        score: rating.score,
        creationDate: rating.creationDate,
        responseShown: false,
        responseInApproval: false,
        responseSent: false
      };

      
    });
  }
    
  getStarValues(): number[] {
    return [1, 2, 3, 4, 5];
  }

  setRating(rating: any, value: number): void {
    // Implement your logic to handle setting the rating
    console.log(`Setting rating ${value} for user ${rating.username}`);
  }

  getReviewsByProfileId(){
    
  }

  sendResponse(id: number, responseText?: string){
    
    var reviewResponse = {
      reviewId: id,
      responseText: responseText
    } as SendResponse;

    this.apiService.saveResponse(reviewResponse);

    this.ratingsMapped = this.ratingsMapped.map((obj) => {
      // Change the value for the object with id 2
      if (obj.id === id) {
        return { ...obj, responseSent: true };
      }
      return obj;
    });
  }
}