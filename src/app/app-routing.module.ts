import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { SupplierProfileComponent } from './components/supplier-profile-component/supplier-profile.component';
import { ContactComponent } from './components/contact-component/contact.component';
import { AboutUsComponent } from './components/about-us-component/about-us.component';
import { LoginComponent } from './components/login-component/login.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { BlogComponent } from './components/blog-component/blog.component';
import { CustomersComponent } from './components/customers-component/customers.component';
import { BlogsComponent } from './components/blogs-component/blogs.component';
import { PartnerDashboardComponent } from './components/partner-dashboard/partner-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/profile-component/profile.component';
import { EditProfileComponent } from './components/profile-components/edit-profile/edit-profile.component';
import { FavoritesComponent } from './components/favorites-component/favorites.component';
import { RecoverPasswordComponent } from './components/recover-password-component/recover-password.component';
import { LegalAnpcComponent } from './components/legal-components/legal-anpc-component/legal-anpc.component';
import { LegalGdprComponent } from './components/legal-components/legal-gdpr-component/legal-gdpr.component';
import { LegalTermsComponent } from './components/legal-components/legal-terms-component/legal-terms.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { createApplication } from '@angular/platform-browser';
import { ActivateAccountComponent } from './components/activate-account-component/activate-account.component';
import { LegalCookiesPoliticsComponent } from './components/legal-components/legal-cookies-politics-component/legal-cookies-politics.component';
import { LegalConfidentialityComponent } from './components/legal-components/legal-confidentiality-component/legal-confidentiality.component';
import { ProfileResolver } from './resolvers/profile.resolver';

const routes: Routes = [
{ path: '', component: DashboardComponent },
{ path: 'acasa', redirectTo: '', pathMatch: 'full' },
{ path: 'contact', component: ContactComponent},
{ path: 'furnizor', component: SupplierProfileComponent },
{
  path: 'furnizor/:profileId',
  component: SupplierProfileComponent,
  resolve: {
    profile: ProfileResolver
  }
},
{ path: 'despre-noi', component: AboutUsComponent},
{ path: 'autentificare', component: LoginComponent},
{ path: 'Favorite', component: FavoritesComponent},
{ path: 'EditareProfil/:id', component: EditProfileComponent},
{ path: 'blog/:id', component: BlogComponent},
{ path: 'noutati', component: BlogsComponent},
{ path: 'dashboard', component: PartnerDashboardComponent},
{ path: 'admin-dashboard', component: AdminDashboardComponent},
{ path: 'furnizori', component: CustomersComponent},
{ path: 'furnizori/:id/:description', component: CustomersComponent },
{ path: 'RecuperareParola', component: RecoverPasswordComponent },
{ path: 'GDPR', component: LegalGdprComponent},
{ path: 'PoliticadeCookies', component: LegalCookiesPoliticsComponent},
{ path: 'PoliticadeConfidentialitate', component: LegalConfidentialityComponent},
{ path: 'TermenisiConditii', component: LegalTermsComponent},
{ path: 'ActivareCont', component: ActivateAccountComponent},
{ path: 'Inscriere', component: CreateAccountComponent },
{ path: 'Inscriere/client', component: CreateProfileComponent, data: { isBusinessAccount: false } },
{ path: 'Inscriere/client/:partnerIdentifier', component: CreateProfileComponent, data: { isBusinessAccount: false } },
{ path: 'Inscriere/furnizor/:partnerIdentifier', component: CreateProfileComponent, data: { isBusinessAccount: true } },
{ path: 'Inscriere/furnizor', component: CreateProfileComponent, data: { isBusinessAccount: true } },
{ path: 'profil', component: ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
