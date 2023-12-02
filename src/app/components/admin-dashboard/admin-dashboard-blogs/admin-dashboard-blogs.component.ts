import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardBlog, AdminDashboardPartners, AdminDashboardProfilesChanged, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard-blogs',
  templateUrl: './admin-dashboard-blogs.component.html',
  styleUrls: ['./admin-dashboard-blogs.component.css']
})
export class AdminDashboardBlogsComponent implements OnInit, AfterViewInit {
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsProfilesChanged: string[] = ['name', 'image', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: AdminDashboardBlog[] = [{ id : 1, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 2, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 3, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 1, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 2, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 3, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 1, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 2, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                  { id : 3, title: 'Blog', image: 'https://eventador.ro/uploads/2018/07/Francisc-Photographer-1@2x-50.jpg' },
                                                ];

    dataSource = new MatTableDataSource<AdminDashboardBlog>(this.profiles);
    
  constructor(private breakpointObserver: BreakpointObserver) {
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

  
