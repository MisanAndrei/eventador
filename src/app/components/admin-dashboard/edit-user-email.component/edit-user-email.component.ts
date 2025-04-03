import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAnalytics } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';

@Component({
  selector: 'app-edit-user-email',
  templateUrl: './edit-user-email.component.html',
  styleUrls: ['./edit-user-email.component.css']
})
export class EditUserEmailComponent {
  @Input() user!: UserAnalytics;
  @Output() close = new EventEmitter<void>();

  newEmail: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.user) {
      this.newEmail = this.user.email;
    }
  }

  saveEmail(): void {
    if (!this.newEmail || this.newEmail === this.user.email) {
      return;
    }

    this.apiService.changeUserEmail(this.user.id, this.newEmail).subscribe({
      next: () => {
        alert('Email updated successfully!');
        this.close.emit();
      },
      error: (err) => {
        console.error('Error updating email:', err);
        alert('Eroare la actualizarea email-ului');
      }
    });
  }
}
