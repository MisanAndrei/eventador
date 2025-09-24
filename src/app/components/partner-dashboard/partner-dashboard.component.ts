import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Chart } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

import {
  PartnerSupplierUser,
  PartnerSupplierUserProfile
} from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit, OnDestroy {
  webColumns: string[] = ['profileName', 'dateAdded', 'category'];
  mobileColumns: string[] = ['profileName', 'dateAdded', 'category'];
  displayedColumns!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  profiles: PartnerSupplierUserProfile[] = [];
  dataSource = new MatTableDataSource<PartnerSupplierUserProfile>();

  searchControl = new FormControl('');
  isMobile!: Observable<boolean>;
  private chartInstance?: Chart;
  usersNumber = 0;
  profilesNumber = 0;
  nameinitials = '';
  partnerName = '';
  suppliersCosts = 0;
  affiliateRevenue = 0;
  eventadorAffiliateId = 203;
  showMoney: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getLoggedUser();
    if (user.id == this.eventadorAffiliateId) {
      this.showMoney = true;
    }
    this.nameinitials = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;
    this.partnerName = `${user.firstName} ${user.lastName}`;

    this.apiService.getPartnerSuppliers(user.id).subscribe(response => {
      const allProfiles: PartnerSupplierUserProfile[] = [];

      response.forEach(user => {
        user.profiles.forEach(profile => {
          profile.formattedDate = this.convertDate(profile.createdAt);
          allProfiles.push(profile);
        });

        this.profilesNumber += user.profiles.reduce(
          (sum, profile) => sum + (profile.categoryNames?.length || 0),
          0
        );
      });

      this.usersNumber = response.length;
      this.suppliersCosts = this.profilesNumber * 100;
      this.affiliateRevenue = this.suppliersCosts / 4;

      this.profiles = allProfiles;
      this.dataSource.data = this.profiles;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'category':
            return item.categoryNames?.join(', ') || '';
          case 'profileName':
            return item.name;
          case 'dateAdded':
            return item.formattedDate;
          default:
            return (item as any)[property];
        }
      };

      this.searchControl.valueChanges
        .pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(value => {
          this.dataSource.filter = value!.trim().toLowerCase();
        });

      const profileCounts = this.countProfilesByMonth(response);
      setTimeout(() => this.createChart(profileCounts), 0); // defer chart rendering
    });

    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );

    this.isMobile.subscribe(isMobile => {
      this.displayedColumns = isMobile ? this.mobileColumns : this.webColumns;
    });
  }

  convertDate(dateString: Date): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  countProfilesByMonth(data: PartnerSupplierUser[]): number[] {
    const profileCounts = new Array(12).fill(0);
    data.forEach(user => {
      user.profiles.forEach(profile => {
        const month = new Date(profile.createdAt).getMonth();
        profileCounts[month]++;
      });
    });
    return profileCounts;
  }

  createChart(profileCounts: number[]): void {
    const ctx = document.getElementById('profileChart') as HTMLCanvasElement | null;
  
    if (!ctx) {
      console.warn('Chart canvas not found.');
      return;
    }
  
    // Destroy existing chart if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
          'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
        ],
        datasets: [{
          label: 'Număr de furnizori adăugați',
          data: profileCounts,
          backgroundColor: 'gray'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  goToProfile(profile: PartnerSupplierUserProfile): void {
    const formattedProfileName = this.formatProfileName(profile.name);
    const url = `/furnizor/${formattedProfileName}-${profile.id}`;
     if (!isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
     }
  }

  formatProfileName(profileName: string): string {
    return profileName.replace(/\s+/g, '-');
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
