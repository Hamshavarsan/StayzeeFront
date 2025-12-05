import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Customer } from './customer/customer';
import { Owner } from './owner/owner';
import { Profile } from './profile/profile';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'customer', component: CustomerDashboardComponent },
    { path: 'customer', component: Customer },
    { path: 'owners', component: Owner },

    { path: 'profile', component: Profile },
];
