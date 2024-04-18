import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { DashboardProfiles, PartnerProfile, PartnerSupplierUser, PartnerSupplierUserProfile } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ChartOptions, ChartType, ChartDataset, Chart } from 'chart.js/auto';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';




@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    webColumns: string[] = ['profileName', 'dateAdded', 'category'];
    mobileColumns: string[] = ['profileName', 'dateAdded', 'category'];
    displayedColumns!: string[];
    usersNumber: number = 0;
    profilesNumber: number = 0;
    nameinitials: string = "";

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    
    searchControl = new FormControl('');
    isMobile!: Observable<boolean>;

    profiles: PartnerSupplierUserProfile[] = [];
    
    dataSource = new MatTableDataSource<PartnerSupplierUserProfile>(this.profiles);

    
  
  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService, private router: Router) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
    const user = this.authService.getLoggedUser();
    this.nameinitials = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
    this.apiService.getPartnerSuppliers(this.authService.getLoggedUser().id).subscribe(response => {
      response.forEach(user => {
        user.profiles.forEach(profile => {
          profile.formattedDate = this.convertDate(profile.createdAt);
          this.profiles.push(profile);
        })
        this.profilesNumber = this.profilesNumber + user.profiles.length;
      })
      this.usersNumber = response.length;
      const profileCounts = this.countProfilesByMonth(response);
      this.createChart(profileCounts);
      
    })

    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

        this.isMobile.subscribe(x => {
            if (x){
                this.displayedColumns = this.mobileColumns;
              }
              else{
                this.displayedColumns = this.webColumns;
              }
        })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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

  convertDate(dateString: Date){
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Get the day and add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: Months are zero-based)
    const year = date.getFullYear(); // Get the full year

    const shortDate = `${day}/${month}/${year}`;

    return shortDate;
  }

  countProfilesByMonth(data: PartnerSupplierUser[]): number[] {
    const profileCounts = new Array(12).fill(0); // Array to store counts for each month (0-11)
  
    data.forEach(user => {
      user.profiles.forEach(profile => {
        const month = new Date(profile.createdAt).getMonth(); // Get the month index (0-11)
        profileCounts[month]++;
      });
    });
  
    return profileCounts;
  }

  createChart(profileCounts: number[]): void {
    const months = [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ];

    const ctx = document.getElementById('profileChart') as HTMLCanvasElement;
    new Chart(
      ctx,
      {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Numar de furnizori adaugati',
              data: profileCounts,
              backgroundColor: 'gray'
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      }
    );
  }

  goToProfile(profile: PartnerSupplierUserProfile) {
    const formattedProfileName = this.formatProfileName(profile.name);
    this.router.navigate(['/furnizor', `${formattedProfileName}-${profile.id}`]);
    }

  formatProfileName(profileName: string): string {
    return profileName.replace(/\s+/g, '-');
  }
  
}