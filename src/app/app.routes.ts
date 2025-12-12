import { Routes } from '@angular/router';

// Components import (nee sonnadhu correct path-la irundha work aagum)
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { Favorites } from './features/customer/favorites/favorites.component';
import { HomeComponent } from './home.component/home.component';
import { RentalHomeComponent } from './rentalhome.component/rentalhome.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { BookingComponent } from './components/booking/booking.component';  // ← Updated path
import { AddProperty } from './owner/add-property/add-property';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomerComponent } from './admin/customer/customer.component';
import { AdminOwnerComponent } from './admin/owner/owner.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { About } from './features/about/about';

// Optional: Auth Guard (later add pannikalam)


export const routes: Routes = [

  // Public Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'otp-verify', component: OtpVerificationComponent },
  { path: 'about', component: About },

  // Customer Routes
  { path: 'home', component: HomeComponent },
  { path: 'rentalhome', component: RentalHomeComponent },
  { path: 'property/:id', component: HomeDetailComponent },
  { path: 'favorites', component: Favorites },
  { path: 'profile', component: Profile },

  // Booking Page (Customer sees all properties & books)
  { path: 'booking', component: BookingComponent },           // ← All listings + inline booking
  { path: 'booking/:id', component: BookingComponent },       // ← Optional: direct booking from detail page

  // Owner Routes
  { path: 'add-property', component: AddProperty },

  // Admin Routes
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: 'customers', component: AdminCustomerComponent },
      { path: 'owners', component: AdminOwnerComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },

  // Wildcard
  { path: '**', redirectTo: '/login' }

];