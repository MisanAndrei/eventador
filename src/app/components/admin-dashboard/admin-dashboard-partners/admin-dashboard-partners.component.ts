import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardPartners, AdminDashboardProfilesChanged, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard-partners',
  templateUrl: './admin-dashboard-partners.component.html',
  styleUrls: ['./admin-dashboard-partners.component.css']
})
export class AdminDashboardPartnersComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsProfilesChanged: string[] = ['firstname', 'lastname', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: AdminDashboardPartners[] = [{ id : 1, firstname: 'Misan', lastname: 'Andrei' },
                                                  { id : 2, firstname: 'Sechei', lastname: 'Radu' },
                                                  { id : 3, firstname: 'Varga', lastname: 'Alex' },
                                                  { id : 1, firstname: 'Misan', lastname: 'Andrei' },
                                                  { id : 2, firstname: 'Sechei', lastname: 'Radu' },
                                                  { id : 3, firstname: 'Varga', lastname: 'Alex' },
                                                  { id : 1, firstname: 'Misan', lastname: 'Andrei' },
                                                  { id : 2, firstname: 'Sechei', lastname: 'Radu' },
                                                  { id : 3, firstname: 'Varga', lastname: 'Alex' }
                                                ];

    dataSource = new MatTableDataSource<AdminDashboardPartners>(this.profiles);
    
  constructor(private breakpointObserver: BreakpointObserver) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
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

  acceptChanges(){

  }

  showChanges(){
    this.changesProfileId = 9;
  }

  

  
  
 
  }

  
