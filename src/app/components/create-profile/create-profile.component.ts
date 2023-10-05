import { Component } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent {
    // Common User Information
    name: string = '';
    email: string = '';
    phone: string = '';
  
    // Business Specific Information
    businessName: string = '';
    businessEmail: string = '';
    category: string = '';
    description: string = '';
    motto: string = '';
    websiteUrl: string = '';
    facebookUrl: string = '';
    instagramUrl: string = '';
    youtubeUrl: string = '';
    selectedImages: File[] = [];
  
    // Toggle for Business Account
    isBusinessAccount: boolean = false;
  
    // Method to toggle business info visibility
    toggleBusinessInfo() {
      // Reset business info fields when toggled off
      if (!this.isBusinessAccount) {
        this.businessName = '';
        this.businessEmail = '';
        this.category = '';
        this.description = '';
        this.motto = '';
        this.websiteUrl = '';
        this.facebookUrl = '';
        this.instagramUrl = '';
        this.youtubeUrl = '';
      }
    }

    onImagesSelected(event: any) {
        this.selectedImages = Array.from(event.target.files);
        // Process the selected images here, e.g., upload them or display previews.
      }

    onSaveButtonClick() {
    // Implement the logic to save the profile data and images here
    // This method will be triggered when the "Save" button is clicked.
    // You can access all the form field values and selected images from the component properties.
    }
  
  }