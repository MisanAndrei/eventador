import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { NgChartsModule} from 'ng2-charts';



import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { MatIconModule } from '@angular/material/icon';


import { JwtModule } from '@auth0/angular-jwt';

import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



//Components
import { ImageSliderComponent } from './components/image-slider-component/image-slider.component';
import { NavigationBarComponent } from './components/navigation-bar-component/navigation-bar.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { CategoriesProfilesComponent } from './components/categories-profiles-component/categories-profiles.component';
import { SupplierProfileComponent } from './components/supplier-profile-component/supplier-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './components/contact-component/contact.component';
import { AboutUsComponent } from './components/about-us-component/about-us.component';
import { LoginComponent } from './components/login-component/login.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ImageEnlargedViewComponent } from './components/image-gallery/image-enlarged-view.component';
import { PresentationTabComponent } from './components/presentation-tab-component/presentation-tab.component';
import { BlogsTabComponent } from './components/blogs-tab-component/blogs-tab.component';
import { ContactTabComponent } from './components/contact-tab-component/contact-tab.component';
import { BlogComponent } from './components/blog-component/blog.component';
import { SideMenuComponent } from './components/side-menu-component/side-menu.component';
import { ApplicationContainerComponent } from './components/application-container-component/application-container.component';
import { CustomersComponent } from './components/customers-component/customers.component';
import { BlogsComponent } from './components/blogs-component/blogs.component';
import { PartnerDashboardComponent } from './components/partner-dashboard/partner-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    ImageSliderComponent,
    NavigationBarComponent,
    DashboardComponent,
    CategoriesProfilesComponent,
    SupplierProfileComponent,
    ContactComponent,
    AboutUsComponent,
    LoginComponent,
    CreateProfileComponent,
    ImageEnlargedViewComponent,
    PresentationTabComponent,
    BlogsTabComponent,
    ContactTabComponent,
    BlogComponent,
    SideMenuComponent,
    ApplicationContainerComponent,
    CustomersComponent,
    BlogsComponent,
    PartnerDashboardComponent
  ],
  imports: [
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    NgIf,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AlertModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    JwtModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
