import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardBlog, AdminDashboardPartners, AdminDashboardProfilesChanged, ApprovalReview, Blog, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-reviews',
  templateUrl: './admin-dashboard-reviews.component.html',
  styleUrls: ['./admin-dashboard-reviews.component.css']
})
export class AdminDashboardReviewsComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsReviews: string[] = ['profileName', 'reviewText', 'responseText', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    reviews: ApprovalReview[] = [];
    dataSource = new MatTableDataSource<ApprovalReview>(this.reviews);
    
  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
   
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngAfterViewInit(): void {
    this.apiService.getApprovalReviews().subscribe(response => {
      this.reviews = response;
      this.dataSource = new MatTableDataSource<ApprovalReview>(this.reviews);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
     })

    
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.dataSource.filter = value!.trim().toLowerCase();
      });
  }
  approveReview(review: ApprovalReview){
    this.apiService.approveOrRejectReview(review.reviewId, true).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error('Error saving review:', error);
        // Handle error
      }
    });
  }

  rejectReview(review: ApprovalReview){
    this.apiService.approveOrRejectReview(review.reviewId, false).subscribe({
      next: () => {

      },
      error: (error) => {
        console.error('Error saving review:', error);
        // Handle error
      }
    });
  }
  }

  
