// admin-dashboard-blog-upsert.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { ApiService } from 'src/app/Services/ApiService';
//import { BlogService } from './blog.service';
import { ViewChild, ElementRef } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';

@Component({
  selector: 'app-admin-dashboard-upsert-blog',
  templateUrl: './admin-dashboard-upsert-blog.component.html',
  styleUrls: ['./admin-dashboard-upsert-blog.component.css'],
})
export class AdminDashboardBlogUpsertComponent implements OnInit {
  @Input() blogId?: number;
  blogForm!: FormGroup;
  isEditing = false;
  pdfSrc: string = "https://evemtadorstorage.blob.core.windows.net/blogs/Oferta_colaborare_MC_Alexandru_Costin_-_24_08_2024_Grand_Hotel_Italia.pdf";
  pdfFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required], 
      description: ['', Validators.required],
      image: [''],
      minutesToRead: [0, Validators.min(0)], // Default to 0, assuming non-negative values
    });

    if (this.blogId) {
      this.isEditing = true;
      this.loadBlogForEditing();
    }
  }

  private loadBlogForEditing(): void {
    //this.blogService.getBlogById(this.blogId).subscribe((blog) => {
    //  this.blogForm.patchValue(blog);
   // });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.blogForm.value.title);
    formData.append('description', this.blogForm.value.description);
    formData.append('minutesToRead', this.blogForm.value.minutesToRead);
    formData.append('image', this.blogForm.value.image);
    if (this.pdfFile) {
      formData.append('content', this.pdfFile); // Append the pdfFile if it exists
    }

    this.apiService.addBlog(formData);
 }

onImageSelected(event: any): void {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    const selectedImage: File = files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64Image = e.target.result as string;
      const base64Data = base64Image.split(',')[1];
      this.blogForm.patchValue({
        
        image: base64Data,
      });
    };

    reader.readAsDataURL(selectedImage);
  }
}

onFileSelected(event: any): void {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    this.pdfFile = files[0]; // Store the selected PDF file for later use
  }
}


}
