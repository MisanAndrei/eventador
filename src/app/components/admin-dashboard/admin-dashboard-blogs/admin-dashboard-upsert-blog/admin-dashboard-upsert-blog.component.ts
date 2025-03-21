import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/ApiService';
import { UpsertBlogRequest } from 'src/app/Requests/Requests';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialogs/dialog-component/dialog.component';

import { Editor } from 'ngx-editor';
import { Blog } from 'src/app/Models/Models';

@Component({
  selector: 'app-admin-dashboard-upsert-blog',
  templateUrl: './admin-dashboard-upsert-blog.component.html',
  styleUrls: ['./admin-dashboard-upsert-blog.component.css'],
})
export class AdminDashboardBlogUpsertComponent implements OnInit, OnDestroy {
  @Input() blogId?: number;
  blogForm!: FormGroup;
  isEditing = false;
  editorContent = ''; // Content for Quill Editor
  editor!: Editor;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // ✅ Initialize form
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      minutesToRead: [0, Validators.min(0)],
    });

    // ✅ Initialize Quill Editor
    this.editor = new Editor();

    // ✅ If blogId exists, load blog for editing
    if (this.blogId) {
      this.isEditing = true;
      this.loadBlogForEditing();
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // ✅ Load existing blog data into form & editor
  private loadBlogForEditing(): void {
    if (!this.blogId) return;
  
    this.apiService.getBlogById(this.blogId).subscribe({
      next: (blog: Blog) => {
        this.blogForm.patchValue({
          title: blog.title,
          description: blog.description,
          minutesToRead: blog.minutesToRead,
        });
  
        // ✅ Load image if exists
        if (blog.imageUrl) {
          this.blogForm.patchValue({ image: blog.imageUrl });
        }
  
        // ✅ Load blog content into Quill editor
        this.editorContent = blog.content || '';
  
        // ✅ Force update the editor content after form patching
        setTimeout(() => {
          const quill = document.querySelector('.ql-editor');
          if (quill) {
            quill.innerHTML = this.editorContent;
          }
        }, 100);
      },
      error: (error) => {
        console.error('Error loading blog:', error);
        this.openFailureDialog();
      },
    });
  }

  // ✅ Submit (Create or Update)
  onSubmit(): void {
    const upsertBlogRequest: UpsertBlogRequest = {
      title: this.blogForm.value.title,
      description: this.blogForm.value.description,
      minutesToRead: this.blogForm.value.minutesToRead,
      image: this.blogForm.value.image,
      content: this.editorContent
    };

    this.apiService.upsertBlog(upsertBlogRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.openSuccessDialog();
      },
      error: (error) => {
        console.error('Error upserting blog:', error);
        this.openFailureDialog();
      }
    });
  }

  // ✅ Success Dialog
  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: this.isEditing ? 'Blog-ul a fost actualizat cu succes!' : 'Blog-ul a fost adăugat cu succes!',
        isSuccess: true
      }
    });
  }

  // ✅ Failure Dialog
  openFailureDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: 'A apărut o eroare. Vă rugăm să încercați din nou.',
        isSuccess: false
      }
    });
  }

  // ✅ Handle Image Upload
  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedImage: File = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64Image = e.target.result as string;
        this.blogForm.patchValue({ image: base64Image });
      };

      reader.readAsDataURL(selectedImage);
    }
  }

  // ✅ Handle Quill Editor Content Change
  contentChanged(event: any) {
    this.editorContent = event.html;
  }
}
