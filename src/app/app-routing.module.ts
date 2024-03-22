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

const routes: Routes = [
  { path: '', redirectTo: '/acasa', pathMatch: 'full' },
{ path: 'contact', component: ContactComponent},
{ path: 'furnizor', component: SupplierProfileComponent },
{ path: 'furnizor/:id', component: SupplierProfileComponent },
{ path: 'acasa', component: DashboardComponent },
{ path: 'despre-noi', component: AboutUsComponent},
{ path: 'autentificare', component: LoginComponent},
{ path: 'Inscriere', component: CreateProfileComponent},
{ path: 'Inscriere/:partnerIdentifier', component: CreateProfileComponent},
{ path: 'Favorite', component: FavoritesComponent},
{ path: 'EditareProfil/:id', component: EditProfileComponent},
{ path: 'blog/:id', component: BlogComponent},
{ path: 'noutati', component: BlogsComponent},
{ path: 'dashboard', component: PartnerDashboardComponent},
{ path: 'admin-dashboard', component: AdminDashboardComponent},
{ path: 'furnizori', component: CustomersComponent},
{ path: 'furnizori/:id', component: CustomersComponent },
{ path: 'profil', component: ProfileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
