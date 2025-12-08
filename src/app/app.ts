import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Login } from "./login/login";
import { Navigation } from "./navigation/navigation";
import { Home } from './home/home';
import { Topbar } from './topbar/topbar';
import { AdminCustomerComponent } from './admin/customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOwnerComponent } from './admin/owner/owner.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { Routes } from '@angular/router';


import { Customer } from "./customer/customer";
import { Owner } from "./owner/owner";
import { Footer } from './components/footer/footer';

  
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HttpClientModule, Navigation, Home, Topbar, AdminCustomerComponent, AdminOwnerComponent, AdminComponent, SettingsComponent,Customer, Owner,Footer],

  standalone:true,
  
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stayzee-frontend');
}
