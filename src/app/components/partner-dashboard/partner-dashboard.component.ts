import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';




@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    webColumns: string[] = ['profilePicture', 'profileName', 'dateAdded', 'category', 'isPaying', 'location'];
    mobileColumns: string[] = ['profileName', 'category', 'location'];
    displayedColumns!: string[];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: 10,
              autoSkip: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        } as any // Cast as 'any' to bypass type checking for now
      };

      public barChartLabels!: string[];
      public barChartType: ChartType = 'bar';
      public barChartLegend = true;
      public barChartData: ChartDataset[] = [
        { data: [], label: 'Furnizori adaugati',backgroundColor: '#FF63A4' },
      ];
    
    searchControl = new FormControl('');
    isMobile!: Observable<boolean>;
    profilesAdded: ProfilesAddedByMonth[] = [{monthName: 'Ianuarie', profilesAdded: 10}, {monthName: 'Februarie', profilesAdded: 5}, {monthName: 'Martie', profilesAdded: 15}, {monthName: 'Aprilie', profilesAdded: 12}, {monthName: 'Mai', profilesAdded: 8}, {monthName: 'Iunie', profilesAdded: 9}, {monthName: 'Iulie', profilesAdded: 10}, {monthName: 'August', profilesAdded: 10}, {monthName: 'Septembrie', profilesAdded: 10}, {monthName: 'Octombie', profilesAdded: 10}, {monthName: 'Noiembrie', profilesAdded: 10}, {monthName: 'Decembrie', profilesAdded: 10}];

  
  
  partner: PartnerProfile = {id: 1, profilePicture: 'https://eventador.ro/uploads/2020/02/b696e2cace99530e8e6c6fec4c44e95b.jpg', name: 'Misan Andrei', dateAdded: this.convertDate(new Date()), location: 'Cluj-Napoca'}

  profiles: DashboardProfiles[] = [{ id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2021/02/c63f1056b779e775bf64e89c3c4f2ff0.jpeg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Sechei Radu', profilePicture: 'https://eventador.ro/uploads/2018/07/HaiForLimousine-50.jpg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2018/07/HaiForLimousine-50.jpg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2018/07/HaiForLimousine-50.jpg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2021/02/c63f1056b779e775bf64e89c3c4f2ff0.jpeg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2018/07/HaiForLimousine-50.jpg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2018/07/HaiForLimousine-50.jpg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' },
                                    { id : 1, profileName : 'Misan Andrei', profilePicture: 'https://eventador.ro/uploads/2021/02/c63f1056b779e775bf64e89c3c4f2ff0.jpeg', dateAdded: this.convertDate(new Date()), category: 'M.C.', isPaying: false, location: 'Cluj-Napoca' }];
    
    dataSource = new MatTableDataSource<DashboardProfiles>(this.profiles);
  
  constructor(private breakpointObserver: BreakpointObserver) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
    this.barChartLabels = this.profilesAdded.map(item => item.monthName);
    this.barChartData[0].data = this.profilesAdded.map(item => item.profilesAdded);

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
    this.setProgress(50);

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

  convertDate(date: Date){
    const day = date.getDate().toString().padStart(2, '0'); // Get the day and add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (Note: Months are zero-based)
    const year = date.getFullYear(); // Get the full year

    const shortDate = `${day}/${month}/${year}`;

    return shortDate;
  }

  setProgress(percent: number): void {
    const progressFill = document.querySelector('.progress-fill') as HTMLElement;
    const progressLabel = document.querySelector('.progress-label') as HTMLElement;
  
    // Calculate the degree of rotation based on the percentage
    const degrees = (360 * percent) / 100;
  
    // Calculate the clip path based on the percentage
    const clipPathValue = `inset(0 0 0 ${100 - percent}%)`;
  
    // Apply the rotation and clip path
    progressFill.style.transform = `rotate(${degrees}deg)`;
    progressFill.style.clipPath = clipPathValue;
  
    progressLabel.textContent = `${percent}%`;
    progressFill.style.backgroundColor = '#7643CA';
    progressFill.style.background = 'linear-gradient(to right, #FF63A4, #FE8962)';
 
  }

  
}