import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Category, Group, MappedCategory } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-admin-dashboard-upsert-main-category',
  templateUrl: './admin-dashboard-upsert-main-category.component.html',
  styleUrls: ['./admin-dashboard-upsert-main-category.component.css']
})


export class AdminDashboardUpsertMainCategoryComponent implements OnInit {
  @Input() group?: Group;
  groupForm: FormGroup;
  imageBase64: string | ArrayBuffer | null = null;
  categories!: MappedCategory[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.groupForm = this.formBuilder.group({
      name: [''],
      showOnLandingPage: [false]
    });
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

    this.apiService.getCategories().subscribe((apiCategories: Category[]) => {
      // Check if categories from API already exist in the list, if not, add them
      apiCategories.forEach(apiCategory => {
        const existingCategory = this.categories.find(category => category.id === apiCategory.id);
        if (!existingCategory) {
          //this.categories.push({ ...apiCategory, checked: false });
        }
      });
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result;
    };
    reader.readAsDataURL(file);
  }
}