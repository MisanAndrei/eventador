import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  message!: string;
  icon!: string;
  isSuccess!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, isSuccess: boolean },
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
    this.isSuccess = this.data.isSuccess;
    this.icon = this.isSuccess ? 'check_circle' : 'error';
    this.autoCloseDialog();
  }

  autoCloseDialog(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000); // Close the dialog after 3 seconds (adjust as needed)
  }
}