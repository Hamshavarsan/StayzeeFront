import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../pipes/translate.pipe';


@Component({
  selector: 'app-navigation',
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  isCollapsed = false;
  mobile = false;

  constructor(private router: Router) {
    this.checkWidth();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:resize')
  checkWidth() {
    if (typeof window !== 'undefined') {
      this.mobile = window.innerWidth < 900;
      if (this.mobile) this.isCollapsed = true;
    }
  }

  closeIfMobile() {
    if (this.mobile) this.isCollapsed = true;
  }
}