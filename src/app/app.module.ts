import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';



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
import { MatTabsModule } from '@angular/material/tabs';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { PdfViewerModule } from 'ng2-pdf-viewer';




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
import { ProfileComponent } from './components/profile-component/profile.component';
import { RatingComponent } from './components/rating-component/rating.component';
import { AdminDashboardSuppliersComponent } from './components/admin-dashboard/admin-dashboard-suppliers-changes/admin-dashboard-suppliers.component';
import { AdminDashboardPartnersComponent } from './components/admin-dashboard/admin-dashboard-partners/admin-dashboard-partners.component';
import { AdminDashboardCategoriesComponent } from './components/admin-dashboard/admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminDashboardBlogsComponent } from './components/admin-dashboard/admin-dashboard-blogs/admin-dashboard-blogs.component';
import { AdminDashboardBlogUpsertComponent } from './components/admin-dashboard/admin-dashboard-blogs/admin-dashboard-upsert-blog/admin-dashboard-upsert-blog.component';
import { AdminDashboardCategoryUpsertComponent } from './components/admin-dashboard/admin-dashboard-categories/admin-dashboard-category-upsert/admin-dashboard-category-upsert.component';
import { AdminDashboardCategoryStatusComponent } from './components/admin-dashboard/admin-dashboard-categories/admin-dashboard-category-status/admin-dashboard-category-status.component';
import { AdminDashboardReviewsComponent } from './components/admin-dashboard/admin-dashboard-reviews/admin-dashboard-reviews.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password-component/change-password.component';
import { EditPersonalDataComponent } from './components/edit-personal-data-component/edit-personal-data.component';
import { DeleteAccountComponent } from './components/delete-account-component/delete-account.component';
import { AddProfileComponent } from './components/profile-components/add-profile-component/add-profile.component';





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
    AffiliateTabComponent,
    ProfileComponent,
    RatingComponent,
    AdminDashboardSuppliersComponent,
    AdminDashboardPartnersComponent,
    AdminDashboardCategoriesComponent,
    AdminDashboardBlogsComponent,
    AdminDashboardBlogUpsertComponent,
    AdminDashboardCategoryUpsertComponent,
    AdminDashboardCategoryStatusComponent,
    AdminDashboardReviewsComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    EditPersonalDataComponent,
    DeleteAccountComponent,
    AddProfileComponent
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
    MatChipsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    AngularEditorModule,
    PdfViewerModule,
    SlickCarouselModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
