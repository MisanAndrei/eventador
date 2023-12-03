import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';


@Component({
  selector: 'app-admin-dashboard-category-upsert',
  templateUrl: './admin-dashboard-category-upsert.component.html',
  styleUrls: ['./admin-dashboard-category-upsert.component.css'],
})
export class AdminDashboardCategoryUpsertComponent implements OnInit {
  @Input() category?: Category;
  categoryForm!: FormGroup;
  isEditing = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: [''] // Default to false, assuming it's not a landing page by default
    });

    if (this.category) {
      this.isEditing = true;
      this.loadCategoryForEditing();
    }
  }

  private loadCategoryForEditing(): void {
    if (this.category)
      this.categoryForm.patchValue(this.category);
    
  }

  onSubmit(): void {
    const category = this.categoryForm?.value;
    category.id = this.category?.id;
    this.apiService.upsertCategory(category);
  }

  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedImage: File = files[0];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const base64Image = e.target.result as string;
        const base64Data = base64Image.split(',')[1];
        this.categoryForm.patchValue({
          
          image: base64Data,
        });
      };
  
      reader.readAsDataURL(selectedImage);
    }
  }
}