import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Services/ApiService';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialogs/dialog-component/dialog.component';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  activationStatus: string = 'Contul se activeaza...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get the token from query params
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
  
      if (token) {
        this.apiService.activateAccount(token).subscribe({
          next: () => {
            // Successful activation (200)
            this.openSuccessDialog('Contul a fost activat cu succes, vă puteți autentifica!');
            setTimeout(() => {
              this.router.navigate(['/acasa']); // Redirect to home after success
            }, 2000); // Delay to show the success message
          },
          error: (error) => {
            // Handle specific error status codes
            switch (error.status) {
              case 403: // Expired token
                this.openFailureDialog(
                  'Codul de activare a expirat, verifica email-ul pentru un nou link de activare, inbox sau spam.'
                );
                setTimeout(() => {
                  this.router.navigate(['/acasa']); // Redirect to home after success
                }, 2000);
                break;
              case 404: // Token does not exist
                this.openFailureDialog('Codul de activare nu există!');
                setTimeout(() => {
                  this.router.navigate(['/acasa']); // Redirect to home after success
                }, 2000);
                break;
              case 409: // Already activated
                this.openFailureDialog(
                  'Codul de activare a fost deja folosit, contul dumneavoastră este activ!'
                );
                setTimeout(() => {
                  this.router.navigate(['/acasa']); // Redirect to home after success
                }, 2000);
                break;
              default: // Generic error
                this.openFailureDialog('O eroare a apărut în timpul activării contului.');
                setTimeout(() => {
                  this.router.navigate(['/acasa']); // Redirect to home after success
                }, 2000);
                break;
            }
            console.error('Activation error:', error);
          }
        });
      } else {
        this.openFailureDialog('Link-ul de activare nu este valid.');
        setTimeout(() => {
          this.router.navigate(['/acasa']); // Redirect to home after success
        }, 2000);
      }
    });
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        message: message,
        isSuccess: true
      }
    });
  }

  openFailureDialog(message: string): void {
    this.dialog.open(DialogComponent, { 
      width: '400px',
      data: {
        message: message,
        isSuccess: false
      }
    });
  }
}