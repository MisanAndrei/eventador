import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialogs/dialog-component/dialog.component';
import { Category, Group, MappedCategory } from 'src/app/Models/Models';
import { UpsertMainCategoryRequest } from 'src/app/Requests/Requests';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-upsert-main-category',
  templateUrl: './admin-dashboard-upsert-main-category.component.html',
  styleUrls: ['./admin-dashboard-upsert-main-category.component.css']
})


export class AdminDashboardUpsertMainCategoryComponent implements OnInit {
  @Input() group?: Group;
  groupForm: FormGroup;
  imageBase64!: string;
  categories!: MappedCategory[];
  unassignedCategories!: MappedCategory[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private dialog: MatDialog) {
    this.groupForm = this.formBuilder.group({
      name: [''],
      showOnLandingPage: [false]
    });
  }

  toggleCategoryChecked(category: MappedCategory): void {
    category.checked = !category.checked;
  }

  ngOnInit(): void {
    if (this.group) {
      this.groupForm.patchValue({
        name: this.group.name,
        showOnLandingPage: this.group.showOnLandingPage
      });
      if (this.group.categories.length > 0){
        this.categories = this.group.categories.map(category => ({ id: category.id ?? 0, name: category.name, checked: true }));
      }
      
    }

    this.apiService.getUnassingedCategories().subscribe(apiCategories => {
      this.unassignedCategories = apiCategories.map(category => ({ id: category.id ?? 0, name: category.name, checked: false }));
     
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Extract the base64 data part
      const base64Image = e.target.result as string;
      const base64Data = base64Image.split(',')[1]; // Split at the comma to get the base64 data
      this.imageBase64 = base64Data;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    const formValue = this.groupForm.value;
    const checkedCategoryIds = this.categories
      .filter(category => category.checked)
      .map(category => category.id);
    checkedCategoryIds.push(...this.unassignedCategories
      .filter(category => category.checked)
      .map(category => category.id));

    const upsertMainCategoryRequest: UpsertMainCategoryRequest = {
      id: this.group?.id,
      name: formValue.name,
      image: this.imageBase64 ?? '',
      categoryIds: checkedCategoryIds
    };

    this.apiService.upsertCategoryGroup(upsertMainCategoryRequest).subscribe({
      next: (response) => {
        console.log('Category group upserted successfully', response);
        this.openSuccessDialog();
      },
      error: (error) => {
        console.error('Error upserting category group:', error);
        this.openFailureDialog();
      }
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'Grupul a fost adaugat/modificat cu succes !',
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

  
}