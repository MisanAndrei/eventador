import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { AdminDashboardBlog, AdminDashboardPartners, AdminDashboardProfilesChanged, Blog, DashboardProfiles, PartnerProfile, ProfilesAddedByMonth } from 'src/app/Models/Models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-blogs',
  templateUrl: './admin-dashboard-blogs.component.html',
  styleUrls: ['./admin-dashboard-blogs.component.css']
})
export class AdminDashboardBlogsComponent implements OnInit, AfterViewInit {
    isCreatingOrEditing: boolean = false;
    editedBlogId?: number;
    private _observer: BreakpointObserver;
    public isMobile!: Observable<boolean>;
    displayedColumnsProfilesChanged: string[] = ['name', 'image', 'actions'];
    searchControl = new FormControl('');
    changesProfileId?: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    profiles: Blog[] = [];
    dataSource = new MatTableDataSource<Blog>(this.profiles);
    
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
    this.apiService.getBlogs().subscribe(response => {
      this.profiles = response;
      this.dataSource = new MatTableDataSource<Blog>(this.profiles);
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

  acceptChanges(){

  }

  showChanges(){
    this.changesProfileId = 9;
  }

  createBlog(){
    this.editedBlogId = undefined;
    this.isCreatingOrEditing = true;
  }

  editBlog(blogId: number){
    this.editedBlogId = blogId;
    this.isCreatingOrEditing = true;

  }

  deleteBlog(blogId: number) {
    //Stergere blog
  }

  

  
  
 
  }

  
