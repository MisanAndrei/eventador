import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProfileAnalytics();
  }

  fetchProfileAnalytics(): void {
    this.apiService.getProfileAnalytics().subscribe({
      next: (data) => {
        this.profileAnalytics = data;
      },
      error: (err) => {
        console.error('Error fetching profile analytics:', err);
      }
    });
  }

  openEditUserEmail(user: UserAnalytics): void {
    this.selectedUser = user;
    this.editUserEmailVisible = true;
  }
}
