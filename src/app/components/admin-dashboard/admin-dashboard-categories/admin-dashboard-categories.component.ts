import {  AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardCategory, AdminDashboardPartners, AdminDashboardProfilesChanged, Category, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-categories',
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrls: ['./admin-dashboard-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminDashboardCategoriesComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    isCreatingOrEditing: boolean = false;
    isChangingStatus: boolean = false;
    editedCategory?: Category;
    displayedColumnsProfilesChanged: string[] = ['name', 'image', 'showOnLandingPage', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: Category[] = [];

    dataSource = new MatTableDataSource<Category>(this.profiles);
    
  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) {
    this._observer = breakpointObserver;
    
  }

  ngOnInit(): void {
    

   console.log(this.profiles);
    this.isMobile = this._observer.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngAfterViewInit(): void {
    this.apiService.getCategories().subscribe(x => {
      this.profiles = x;
      this.dataSource = new MatTableDataSource<Category>(this.profiles)
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

  createCategory(){
    this.isChangingStatus = false;
    this.isCreatingOrEditing = false;
    this.editedCategory = undefined;
    this.isCreatingOrEditing = true;
  }
  editCategory(categoryId: Category) {
    this.isChangingStatus = false;
    this.isCreatingOrEditing = false;
    this.editedCategory = categoryId;
    this.isCreatingOrEditing = true;
    
  }

  changeCategoriesStatus(){
    this.isCreatingOrEditing = false;
    this.isChangingStatus = true;
  }




  

  
  
 
  }

  
