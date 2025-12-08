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
import { CreateBookingComponent } from './features/booking/create-booking/create-booking.component';
import { BookingListComponent } from './features/booking/booking-list/booking-list.component';
import { BookingDetailsComponent } from './features/booking/booking-details/booking-details.component';
import { ShareBookingComponent } from './features/booking/share-booking/share-booking.component';
import { AddProperty } from './owner/add-property/add-property';

//import { profile } from 'console';



export const routes: Routes = [
    { path: '', component: Login}, 
    { path: 'login', component: Login },
    { path: 'home', component: Home },
    { path: 'register', component: Register },  
    { path: 'home', component: CustomerDashboardComponent },
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
    { path: '', redirectTo: 'booking/list', pathMatch: 'full' },
    { path: 'booking/create', component: CreateBookingComponent },
    { path: 'booking/list', component: BookingListComponent },
    { path: 'booking/:id', component: BookingDetailsComponent },
    { path: 'booking/:id/share', component: ShareBookingComponent },
    //{ path: '**', redirectTo: 'booking/list' },
    { path: 'booking/create/:propertyId', component: CreateBookingComponent },
    { path: 'add-property', component: AddProperty}





];
  
