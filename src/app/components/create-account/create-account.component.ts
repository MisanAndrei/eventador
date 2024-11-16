import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  constructor(private router: Router) {}

  /**
   * Handles the selection of the account type and redirects to the CreateProfileComponent
   * with the appropriate query parameter.
   * @param accountType 'user' for a normal user account, 'supplier' for a business account
   */
  onSelectAccount(accountType: string) {
    if (accountType === 'client') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Inscriere/client']);
      });
    } else if (accountType === 'furnizor') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Inscriere/furnizor']);
      });
    }
  }
}