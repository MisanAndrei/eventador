import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName: string = 'John';
  lastName: string = 'Doe';
  email: string = 'john.doe@example.com';
  phoneNumber: string = '123-456-7890';
  accountCreated: Date = new Date(); // Assuming you have the date when the account was created

  constructor() {}

  ngOnInit(): void {}
}