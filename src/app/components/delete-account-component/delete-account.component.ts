import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  @Output() confirmation = new EventEmitter<boolean>();

  confirmDeletion(confirmed: boolean) {
    //api call for deletion
    this.confirmation.emit(confirmed);
  }
}