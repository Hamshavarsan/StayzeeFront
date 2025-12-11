import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbars',
  standalone:true,
  imports: [CommonModule,RouterLinkActive,RouterLink],
  templateUrl: './navbars.html',
  styleUrl: './navbars.scss',
})
export class Navbars {
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

