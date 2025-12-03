import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Customer } from './customer/customer';
import { Owner } from './owner/owner';
import { Profile } from './profile/profile';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'customer', component: Customer },
    { path: 'owners', component: Owner },
    { path: 'profile', component: Profile },
];
