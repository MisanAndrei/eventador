// admin-dashboard-blog-upsert.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { ApiService } from 'src/app/Services/ApiService';
//import { BlogService } from './blog.service';

@Component({
  selector: 'app-admin-dashboard-upsert-blog',
  templateUrl: './admin-dashboard-upsert-blog.component.html',
  styleUrls: ['./admin-dashboard-upsert-blog.component.css'],
})
export class AdminDashboardBlogUpsertComponent implements OnInit {
  @Input() blogId?: number;
  blogForm!: FormGroup;
  isEditing = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
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
    console.log(this.blogForm.value);
    const blog = this.blogForm.value;
    this.apiService.addBlog(blog);
/*
    if (this.isEditing) {
      this.blogService.updateBlog(this.blogId, blog).subscribe((updatedBlog) => {
        console.log('Blog updated:', updatedBlog);
      });
    } else {
      this.blogService.createBlog(blog).subscribe((createdBlog) => {
        console.log('Blog created:', createdBlog);
      });
    }
*/ }

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
}