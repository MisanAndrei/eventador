// admin-dashboard-blog-upsert.component.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { ApiService } from 'src/app/Services/ApiService';
import { Editor, Toolbar } from 'ngx-editor';
//import { BlogService } from './blog.service';

@Component({
  selector: 'app-admin-dashboard-upsert-blog',
  templateUrl: './admin-dashboard-upsert-blog.component.html',
  styleUrls: ['./admin-dashboard-upsert-blog.component.css'],
})
export class AdminDashboardBlogUpsertComponent implements OnInit, OnDestroy {
  @Input() blogId?: number;
  blogForm!: FormGroup;
  isEditing = false;
  editor!: Editor;
  html = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}
  ngOnDestroy(): void {
    this.editor.destroy();
  }

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
    this.editor = new Editor();
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
    

    this.apiService.addBlog(formData).subscribe({
      next: () => {
        console.log("merge");
      },
      error: (error) => {
        console.error('Error saving review:', error);
        // Handle error
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
      this.blogForm.patchValue({
        
        image: base64Data,
      });
    };

    reader.readAsDataURL(selectedImage);
  }
}




}
