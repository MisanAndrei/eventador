import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardBlog, AdminDashboardPartner, AdminDashboardProfilesChanged, ApprovalReview, Blog, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialogs/dialog-component/dialog.component';

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
    
  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private dialog: MatDialog) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
   
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  fetchData(){
    this.apiService.getApprovalReviews().subscribe(response => {
      this.reviews = response;
      this.dataSource = new MatTableDataSource<ApprovalReview>(this.reviews);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
     })
  }

  ngAfterViewInit(): void {
    
    this.fetchData();
    
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
        this.openSuccessDialog();
        this.fetchData();
      },
      error: (error) => {
        console.error('Error saving review:', error);
        this.openFailureDialog();
      }
    });
  }

  rejectReview(review: ApprovalReview){
    this.apiService.approveOrRejectReview(review.reviewId, false).subscribe({
      next: () => {
        this.openSuccessDialog();
        this.fetchData();
      },
      error: (error) => {
        console.error('Error saving review:', error);
        this.openFailureDialog();
      }
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Review-ul a fost aprobat/respins cu succes !',
        isSuccess: true
      }
    });
  }

  openFailureDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'A apărut o eroare. Vă rugăm să încercați din nou.',
        isSuccess: false
      }
    });
  }
  }

  
