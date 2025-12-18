import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardPartner, AdminDashboardProfilesChanged, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-partners',
  templateUrl: './admin-dashboard-partners.component.html',
  styleUrls: ['./admin-dashboard-partners.component.css']
})
export class AdminDashboardPartnersComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsProfilesChanged: string[] = ['firstname', 'lastname', 'email', 'suppliersBrought'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: AdminDashboardPartner[] = [];

    dataSource = new MatTableDataSource<AdminDashboardPartner>(this.profiles);

    isUserFormVisible = false;
  selectedUserId: number | null = null;
    
  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

      this.apiService.getPartners().subscribe(response => {
        this.profiles = response;

        this.dataSource = new MatTableDataSource<AdminDashboardPartner>(this.profiles);
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

  acceptChanges(){

  }

  showChanges(){
    this.changesProfileId = 9;
  }

  editUser(userId: number): void {
    this.selectedUserId = userId;
    this.isUserFormVisible = true;
  }

  createUser(): void {
    this.selectedUserId = null;
    this.isUserFormVisible = true;
  }

  closeUserForm(): void {
    this.isUserFormVisible = false;
  }

  

  
  
 
  }

  
