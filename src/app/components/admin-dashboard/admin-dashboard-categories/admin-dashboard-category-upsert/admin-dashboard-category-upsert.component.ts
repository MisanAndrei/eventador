import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialogs/dialog-component/dialog.component';
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

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private dialog: MatDialog) {}

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
    this.apiService.upsertCategory(category).subscribe({
      next: () => {
        console.log("a mers");
        this.openSuccessDialog();
      },
      error: (error) => {
        console.error('Error saving review:', error);
        this.openFailureDialog();
      }
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Categoria a fost adaugata cu succes !',
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