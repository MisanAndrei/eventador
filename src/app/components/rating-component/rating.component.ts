import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  ratings: any[] = [{username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'},
                    {username: 'Misan Andrei', review: 'Cel mai tare M.C asdasdasdasdasd', rating: 4, response: 'Mersi jupane dddddddddddddddddddddddddddddddd', title: 'Nimic de comentat dddddddddddddddddddddddddddddddddd'}];


    isMobile: Observable<boolean>;
    constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
      this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
          map(result => result.matches)
        );
    }
    
  getStarValues(): number[] {
    return [1, 2, 3, 4, 5];
  }

  setRating(rating: any, value: number): void {
    // Implement your logic to handle setting the rating
    console.log(`Setting rating ${value} for user ${rating.username}`);
  }
}