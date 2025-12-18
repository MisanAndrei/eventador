import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProfilesAnalytics, UserAnalytics } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-profile-analytics',
  templateUrl: './profile-analytics.component.html',
  styleUrls: ['./profile-analytics.component.css']
})
export class ProfileAnalyticsComponent implements OnInit {
  profileAnalytics: ProfilesAnalytics | null = null;
  selectedUser!: UserAnalytics;
  editUserEmailVisible: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'email', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<UserAnalytics>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProfileAnalytics();
  }

  fetchProfileAnalytics(): void {
    this.apiService.getProfileAnalytics().subscribe({
      next: (data) => {
        this.profileAnalytics = data;
        this.dataSource.data = data.users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching profile analytics:', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditUserEmail(user: UserAnalytics): void {
    this.selectedUser = user;
    this.editUserEmailVisible = true;
  }
}
