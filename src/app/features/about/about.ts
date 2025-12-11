import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbars } from '../../navbars/navbars';



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,Navbars, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {
  showProfileMenu: boolean = false;

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeMenu(): void {
    this.showProfileMenu = false;
  }
}
