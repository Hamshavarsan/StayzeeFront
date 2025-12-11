import { Routes } from '@angular/router';

import { Owner } from './owner/owner';
import { Profile } from './profile/profile';
import { Favorites } from './features/customer/favorites/favorites.component';
import { Login } from './login/login';
import { Register } from './register/register';
import { Property, PropertyCardComponent } from './features/customer/components/property-card/property-card';
import { SearchResultsComponent } from './features/customer/search-results/search-results';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { NavbarComponent } from './features/customer/shared/navbar/navbar';
import { About } from './features/about/about';
//import { CreateRental } from './create-rental/create-rental';
import { AdminCustomerComponent } from './admin/customer/customer.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { AdminOwnerComponent } from './admin/owner/owner.component';
import { AdminComponent } from './admin/admin.component';
import { Home } from './home/home';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { BookingComponent } from './booking/booking.component';
import { AddProperty } from './owner/add-property/add-property';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
//import { profile } from 'console';

import { Navbars } from './navbars/navbars';


import { HomeComponent } from './home.component/home.component';
import { RentalHomeComponent } from './rentalhome.component/rentalhome.component';



export const routes: Routes = [

    //{ path: '', component: CustomerDashboardComponent}, 
    { path: '', component: Login },
    //{ path: 'home', component: Home },
    { path: 'register', component: Register },  
    //{ path: 'home', component: CustomerDashboardComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'customer', component: AdminCustomerComponent },
    { path: 'owners', component: AdminOwnerComponent },
    { path: 'profile', component: Profile },
    { path: 'admin/settings', component: SettingsComponent },
    { path: 'owners', component: Owner },
    {path:'favorite',component:Favorites},
    {path:'login', component:Login},
    {path:'property',component:PropertyCardComponent},
    {path:'searchresult',component:SearchResultsComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'about',component:About},
    //{ path: 'create-rental', component: CreateRental },
    
    { path: 'home', component: HomeComponent },
    { path: 'rentalhome', component: RentalHomeComponent },
    //{ path: '**', redirectTo: 'booking/list' },
    { path: 'property/:id', component: HomeDetailComponent }, 
    { path: 'add-property', component: AddProperty},
    { path: 'add-property', component: AddProperty},
    
  { path: 'booking/:propertyId', component: BookingComponent },

  
  { path: 'otp-verify', component: OtpVerificationComponent },
  

  {path:'navbars',component:Navbars}


];

