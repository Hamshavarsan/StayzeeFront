import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-navbars',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbars.html',
  styleUrl: './navbars.scss',
})
export class Navbars {
  showProfileMenu = false;

  constructor(public authService: AuthService, private router: Router) {}

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeMenu(): void {
    this.showProfileMenu = false;
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  get username(): string | null {
    return this.authService.getUsername();
  }
  get role(): string | null {
    return this.authService.getRole();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // இதுதான் magic – document-ல எங்கேயாவது கிளிக் பண்ணா menu மூடிடும்
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // profile-section அல்லது அதுல இருக்குற எதுவும் கிளிக் ஆகலைனா மூடு
    if (!target.closest('.profile-section')) {
      this.closeMenu();
    }
  }
}