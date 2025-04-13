import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardProfilesChanged, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { AuthService } from 'src/app/Services/AuthService';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../../dialogs/dialog-component/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dashboard-suppliers',
  templateUrl: './admin-dashboard-suppliers.component.html',
  styleUrls: ['./admin-dashboard-suppliers.component.css']
})
export class AdminDashboardSuppliersComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsProfilesChanged: string[] = ['name', 'category', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: AdminDashboardProfilesChanged[] = [];

    dataSource = new MatTableDataSource<AdminDashboardProfilesChanged>(this.profiles);
    
  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, private authService: AuthService, private dialog: MatDialog) {
    this._observer = breakpointObserver; 
  }

  ngOnInit(): void {
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
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

  acceptChanges(profile: AdminDashboardProfilesChanged){
    this.apiService.acceptProfileChanges(profile.id).subscribe({
      next: () => {
        this.openSuccessDialog(true);
        this.fetchData();
      },
      error: (error) => {
        this.openFailureDialog();
      }
    });
  }

  rejectChanges(profile: AdminDashboardProfilesChanged) {
    const reason = prompt('Motivul respingerii profilului:');
    if (!reason?.trim()) {
      return; // User cancelled or left it empty
    }
  
    this.apiService.rejectProfileChanges(profile.id, reason).subscribe({
      next: () => {
        this.openSuccessDialog(false);
        this.fetchData();
      },
      error: (error) => {
        this.openFailureDialog();
      }
    });
  }

  showChanges(profile: AdminDashboardProfilesChanged){
    this.changesProfileId = profile.id;
  }

  openSuccessDialog(accept: boolean): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: accept ? 'Schimbările au fost acceptate cu succes!' : 'Schimbările au fost respinse cu succes!',
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

  fetchData(){
    this.apiService.getProfilesWithChanges().subscribe(x => {
      this.profiles = x;
      this.dataSource = new MatTableDataSource<AdminDashboardProfilesChanged>(this.profiles)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}

  
