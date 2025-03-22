import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal-cookies',
  templateUrl: './legal-cookies.component.html',
  styleUrls: ['./legal-cookies.component.css']
})
export class LegalCookiesComponent implements OnInit {
  isVisible: boolean = true;

  ngOnInit() {
    // Check if the cookie "cookieBannerClosed" is set
    const cookieBannerClosed = this.getCookie('cookieBannerClosed');
    if (cookieBannerClosed === 'true') {
      this.isVisible = false;
    }
  }

  closeBanner() {
    // Set a cookie to indicate the banner was closed
    this.setCookie('cookieBannerClosed', 'true', 365);
    this.isVisible = false;
  }

  // Function to set a cookie
  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  // Function to get a cookie value
  getCookie(name: string): string {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return '';
  }
}