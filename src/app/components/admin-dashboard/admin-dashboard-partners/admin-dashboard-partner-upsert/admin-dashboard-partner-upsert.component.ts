import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateUser, EditUserRequest } from 'src/app/Models/Models';
import { ApiService } from 'src/app/Services/ApiService';
import { UserRole } from 'src/app/Utilities/enums/Enums';
import { DialogComponent } from 'src/app/components/dialogs/dialog-component/dialog.component';


@Component({
  selector: 'app-admin-dashboard-partner-upsert',
  templateUrl: './admin-dashboard-partner-upsert.component.html',
  styleUrls: ['./admin-dashboard-partner-upsert.component.css']
})
export class AdminDashboardPartnerUpsertComponent implements OnInit {
  @Input() id: number | null = null;
  partnerForm!: FormGroup;
  roles = Object.entries(UserRole)
  .filter(([key, value]) => typeof value === 'number')
  .map(([key, value]) => ({ label: key, value })); // Enum values for the dropdown
  isEditMode = false;
  userRoles = UserRole;

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();

    if (this.id) {
      this.isEditMode = true;
      this.apiService.getUserDetails(this.id).subscribe((data: any) => {
        this.partnerForm.patchValue({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          role: data.role,
          // Password fields are intentionally left out for security reasons
        });
      });
    }
  }

  private initForm() {
    this.partnerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      verifyPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.partnerForm.invalid) {
      return;
    }

    const formValues = this.partnerForm.value;
    if (formValues.password !== formValues.verifyPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (this.isEditMode) {
        const user = {
            userId: this.id,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber
        } as EditUserRequest

      const editUser = { id: this.id, ...user };
      this.apiService.editPersonalData(editUser)
      .subscribe({
        next: (response) => {
          this.openSuccessDialog();
        },
        error: (error) => {
          // Handle error        
          this.openFailureDialog();
        }
      });
    } else {
        const user = {
            email: formValues.email,
            password: formValues.password,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phoneNumber,
            role: formValues.role,
            profile: undefined
          } as CreateUser;

      this.apiService.createUser(user)
      .subscribe({
        next: (response) => {
          this.openSuccessDialog();
        },
        error: (error) => {
          // Handle error        
          this.openFailureDialog();
        }
      });
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: this.isEditMode ? 'Modificarile au fost salvate cu succes!' : 'Userul a fost creat cu succes!',
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