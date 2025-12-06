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
export const routes: Routes = [
    { path: '', component: Login}, 
    { path: 'login', component: Login },
    { path: 'register', component: Register },  
    { path: 'home', component: CustomerDashboardComponent },
    { path: 'profile', component: Profile },
    { path: 'owners', component: Owner },
    {path:'favorite',component:Favorites},
    //{path:'login', component:Login},
    {path:'property',component:PropertyCardComponent},
    {path:'searchresult',component:SearchResultsComponent},
    {path:'navbar',component:NavbarComponent},


];
  
