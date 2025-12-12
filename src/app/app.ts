import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

import { Navigation } from "./navigation/navigation"; // Admin Navbar
import { Navbars } from './navbars/navbars'; // User Navbar
import { Footer } from './components/footer/footer'; // Footer

// Ideally remove unused component imports if they are not used in template directly, 
// but since this is the root component and standalone, we might keep them if they are bootstrapped or used in routes (though routes are lazy or loaded via routes.ts)
// For app.html usage, we definitely need Navigation, Navbars, Footer, RouterOutlet.
// Others are likely not needed in imports array if they are only used in routes, but I'll leave them to avoid breaking anything unexpected, 
// though strictly in standalone app.ts, imports are for the template context.
import { Login } from "./login/login";
import { Home } from './home/home';
import { Topbar } from './topbar/topbar';
import { AdminCustomerComponent } from './admin/customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOwnerComponent } from './admin/owner/owner.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { Customer } from "./customer/customer";
import { Owner } from "./owner/owner";


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    Navigation,
    Navbars,
    Footer,
    // Leaving others just in case, though likely unnecessary for template
    Home, Topbar, AdminCustomerComponent, AdminOwnerComponent, AdminComponent, SettingsComponent, Customer, Owner
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showUserNav = true;
  showAdminNav = false;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        this.updateLayout(url);
      });
  }

  private updateLayout(url: string) {
    // Normalize url
    const cleanUrl = url.split('?')[0];

    // 1. Pages with NO keys (Login, Register, Landing, OTP)
    const noLayoutRoutes = ['/', '/login', '/register', '/otp-verify'];
    // Check if exactly one of these or starts with (for nested? usually login doesn't have nested)
    // We'll use exact match for root '/' and startsWith for others if needed, but strict list is safer to avoid accidents.
    // However, '/login' might have redirects.

    // Simplified checks:
    if (noLayoutRoutes.includes(cleanUrl)) {
      this.setShowFlags(false, false, false);
      return;
    }

    // 2. Admin Pages
    // /admin..., /owners..., /customer (singular)
    if (cleanUrl.startsWith('/admin') || cleanUrl.startsWith('/owners') || cleanUrl === '/customer') {
      this.setShowFlags(false, true, false); // AdminNav: Yes, UserNav: No, Footer: No (Optional)
      return;
    }

    // 3. User Pages (Default)
    this.setShowFlags(true, false, true); // AdminNav: No, UserNav: Yes, Footer: Yes
  }

  private setShowFlags(userNav: boolean, adminNav: boolean, footer: boolean) {
    this.showUserNav = userNav;
    this.showAdminNav = adminNav;
    this.showFooter = footer;
  }
}