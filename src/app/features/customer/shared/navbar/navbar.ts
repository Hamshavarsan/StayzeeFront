import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// In navbar.ts
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="logo">
        <a routerLink="/" class="logo-link">StayZee</a>
      </div>
      <div class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a routerLink="/favorites" routerLinkActive="active">Favorites</a>
        <a href="/setting" routerLinkActive="active">Setting</a>
        <a href="#about" routerLinkActive="active">About Us</a>

      </div>
      <div class="profile-section">
        <div class="profile-icon" (click)="toggleProfileMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <div class="dropdown-menu" [class.show]="showProfileMenu">
            <a routerLink="/profile" (click)="closeMenu()">My Profile</a>
            <a href="#" (click)="onLogout($event)">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .logo .logo-link {
      font-size: 1.5rem;
      font-weight: 700;
      color: #F8A1D1;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
    }

    .nav-links a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #F8A1D1;
    }

    .profile-section {
      position: relative;
    }

    .profile-icon {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.3s ease;
    }

    .profile-icon:hover {
      background-color: #f5f5f5;
    }

    .profile-icon svg {
      width: 24px;
      height: 24px;
      color: #333;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      min-width: 160px;
      margin-top: 0.5rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1001;
    }

    .dropdown-menu.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-menu a {
      display: block;
      padding: 0.75rem 1rem;
      color: #333;
      text-decoration: none;
      transition: background-color 0.2s ease;
    }

    .dropdown-menu a:hover {
      background-color: #f9f9f9;
      color: #F8A1D1;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  showProfileMenu = false;

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeMenu(): void {
    this.showProfileMenu = false;
  }

  onLogout(event: Event): void {
    event.preventDefault();
    // Add your logout logic here
    console.log('Logging out...');
    // Example: this.authService.logout();
    this.closeMenu();
  }
}