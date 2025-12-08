import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { AdminComponent } from './admin/admin.component';

import { AdminCustomerComponent } from './admin/customer/customer.component';
import { AdminOwnerComponent } from './admin/owner/owner.component';
import { SettingsComponent } from './admin/settings/settings.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'customer', component: AdminCustomerComponent },
    { path: 'owners', component: AdminOwnerComponent },
    { path: 'profile', component: Profile },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/settings', component: SettingsComponent },
];
