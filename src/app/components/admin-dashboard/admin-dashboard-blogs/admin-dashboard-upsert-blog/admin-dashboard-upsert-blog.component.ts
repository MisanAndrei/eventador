import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/ApiService';
import { Editor } from 'ngx-editor';
import { UpsertBlogRequest } from 'src/app/Requests/Requests';

@Component({
  selector: 'app-admin-dashboard-upsert-blog',
  templateUrl: './admin-dashboard-upsert-blog.component.html',
  styleUrls: ['./admin-dashboard-upsert-blog.component.css'],
})
export class AdminDashboardBlogUpsertComponent implements OnInit, OnDestroy {
  @Input() blogId?: number;
  blogForm!: FormGroup;
  isEditing = false;
  editorContent = ''; // Property to hold the editor content
  editor!: Editor;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      minutesToRead: [0, Validators.min(0)],
    });

    if (this.blogId) {
      this.isEditing = true;
      this.loadBlogForEditing();
    }

    this.editor = new Editor();
  }

  private loadBlogForEditing(): void {
    // Load blog data and patch the form values accordingly
  }

  onSubmit(): void {
    const upsertBlogRequest: UpsertBlogRequest = {
      title: this.blogForm.value.title,
      description: this.blogForm.value.description,
      minutesToRead: this.blogForm.value.minutesToRead,
      image: this.blogForm.value.image,
      content: this.editorContent
    };

    this.apiService.upsertBlog(upsertBlogRequest).subscribe(x => {
      console.log(x)
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

  contentChanged(event: any){
    this.editorContent = event.html;
  }

  // Update the editor content property whenever the editor content changes

}