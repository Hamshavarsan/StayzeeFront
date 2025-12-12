import { Routes } from '@angular/router';

// Import all your components (adjust paths if needed)
import { Login } from './login/login'; // adjust path
import { Register } from './register/register';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { BookingComponent } from './components/booking/booking.component';
import { HomeComponent } from './home.component/home.component';
import { LandingComponent } from './landing-component/landing-component';
import { Favorites } from './features/customer/favorites/favorites.component';
import { Profile } from './profile/profile';
import { About } from './features/about/about';
import { AddProperty } from './owner/add-property/add-property';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomerComponent } from './admin/customer/customer.component';
import { AdminOwnerComponent } from './admin/owner/owner.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [
  // Default / Home Route
  { path: '', component: LandingComponent },                    // Home page
  { path: 'home', component: HomeComponent },                    // Optional extra home

  // Auth Routes
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'otp-verify', component: OtpVerificationComponent },

  // Customer Routes
  { path: 'customers', component: CustomerDashboardComponent },  // List of properties + Book Now
  { path: 'favorites', component: Favorites },
  { path: 'profile', component: Profile },
  { path: 'about', component: About },

  // Booking Route - VERY IMPORTANT (Single Property Detail + Booking)
  { path: 'booking/:propertyId', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },         // backup for :id

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

  // Wildcard - If nothing matches, go home
  { path: '**', redirectTo: '' }
];