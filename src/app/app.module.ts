import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { JwtModule } from '@auth0/angular-jwt';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GALLERY_CONFIG, GalleryConfig, GalleryModule } from 'ng-gallery';

//Components
import { ImageSliderComponent } from './components/image-slider-component/image-slider.component';
import { NavigationBarComponent } from './components/navigation-bar-component/navigation-bar.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { SupplierProfileComponent } from './components/supplier-profile-component/supplier-profile.component';
import { BrowserModule, HammerModule, provideClientHydration } from '@angular/platform-browser';
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
import { TopCustomersTabComponent } from './components/top-customers-tab/top-customers-tab.component';
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
import { EditProfileComponent } from './components/profile-components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password-component/change-password.component';
import { EditPersonalDataComponent } from './components/edit-personal-data-component/edit-personal-data.component';
import { DeleteAccountComponent } from './components/delete-account-component/delete-account.component';
import { AddProfileComponent } from './components/profile-components/add-profile-component/add-profile.component';
import { FavoritesComponent } from './components/favorites-component/favorites.component';
import { PersonalProfilesComponent } from './components/profile-components/personal-profiles-component/personal-profiles.component';
import { RecoverPasswordComponent } from './components/recover-password-component/recover-password.component';
import { AdminDashboardMainCategoriesComponent } from './components/admin-dashboard/admin-dashboard-main-categories/admin-dashboard-main-categories.component';
import { AdminDashboardUpsertMainCategoryComponent } from './components/admin-dashboard/admin-dashboard-main-categories/admin-dashboard-upsert-main-category/admin-dashboard-upsert-main-category.component.';
import { DialogComponent } from './components/dialogs/dialog-component/dialog.component';
import { AdminDashboardPartnerUpsertComponent } from './components/admin-dashboard/admin-dashboard-partners/admin-dashboard-partner-upsert/admin-dashboard-partner-upsert.component';
import { LegalAnpcComponent } from './components/legal-components/legal-anpc-component/legal-anpc.component';
import { LegalCookiesComponent } from './components/legal-components/legal-cookies-component/legal-cookies.component';
import { LegalGdprComponent } from './components/legal-components/legal-gdpr-component/legal-gdpr.component';
import { LegalTermsComponent } from './components/legal-components/legal-terms-component/legal-terms.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ActivateAccountComponent } from './components/activate-account-component/activate-account.component';
import { AuthInterceptor } from './Services/auth.interceptor';
import { PopularCustomersTabComponent } from './components/popular-customers-tab/popular-customers-tab.component';
import { LIGHTBOX_CONFIG, LightboxConfig, LightboxModule } from 'ng-gallery/lightbox';
import { EditUserEmailComponent } from './components/admin-dashboard/edit-user-email.component/edit-user-email.component';
import { ProfileAnalyticsComponent } from './components/admin-dashboard/profile-analytics/profile-analytics.component';
import { LegalCookiesPoliticsComponent } from './components/legal-components/legal-cookies-politics-component/legal-cookies-politics.component';
import { LegalConfidentialityComponent } from './components/legal-components/legal-confidentiality-component/legal-confidentiality.component';
import { AdminDashboardTopProvidersComponent } from './components/admin-dashboard/admin-dashboard-top-providers/admin-dashboard-top-providers.component';
import { ProfileResolver } from './resolvers/profile.resolver';
import { QRCodeModule } from 'angularx-qrcode';

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
    TopCustomersTabComponent,
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
    AddProfileComponent,
    FavoritesComponent,
    PersonalProfilesComponent,
    RecoverPasswordComponent,
    AdminDashboardMainCategoriesComponent,
    AdminDashboardUpsertMainCategoryComponent,
    DialogComponent,
    AdminDashboardPartnerUpsertComponent,
    LegalAnpcComponent,
    LegalCookiesComponent,
    LegalGdprComponent,
    LegalTermsComponent,
    CreateAccountComponent,
    ActivateAccountComponent,
    ProfileAnalyticsComponent,
    EditUserEmailComponent,
    LegalCookiesPoliticsComponent,
    LegalConfidentialityComponent,
    AdminDashboardTopProvidersComponent
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  AppRoutingModule,
  RouterModule,

  // Angular Material
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatChipsModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatSnackBarModule,
  MatCheckboxModule,
  // Third-party modules
  QRCodeModule,
  AlertModule,
  CarouselModule,
  JwtModule,
  SlickCarouselModule,
  HammerModule,
  GalleryModule,
  LightboxModule
]
,
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy  }, ProfileResolver, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },{
    provide: LIGHTBOX_CONFIG,
    useValue: {
      keyboardShortcuts: true,
      exitAnimationTime: 1000
    } as LightboxConfig
  }, provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
