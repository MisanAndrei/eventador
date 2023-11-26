import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


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
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatTabsModule } from '@angular/material/tabs';





//Components
import { ImageSliderComponent } from './components/image-slider-component/image-slider.component';
import { NavigationBarComponent } from './components/navigation-bar-component/navigation-bar.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
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
import { PopularCustomersTabComponent } from './components/popular-customers-tab/popular-customers-tab.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AboutUsTabComponent } from './components/about-us-tab-component/about-us-tab.component';
import { CategoriesTabComponent } from './components/categories-tab-component/categories-tab.component';
import { AboutCustomersTabComponent } from './components/about-customers-tab-component/about-customers-tab.component';
import { AffiliateTabComponent } from './components/affiliate-tab-component/affiliate-tab.component';





@NgModule({
  declarations: [
    AppComponent,
    ImageSliderComponent,
    NavigationBarComponent,
    DashboardComponent,
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
    PartnerDashboardComponent,
    PopularCustomersTabComponent,
    AdminDashboardComponent,
    AboutUsTabComponent,
    CategoriesTabComponent,
    AboutCustomersTabComponent,
    AffiliateTabComponent
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
    NgChartsModule,
    MatChipsModule,
    MatSelectModule,
    MatSlideToggleModule,
    NgImageSliderModule,
    MatTabsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
