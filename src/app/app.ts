import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Login } from "./login/login";
import { Navigation } from "./navigation/navigation";
import { Home } from './home/home';
import { Topbar } from './topbar/topbar';
import { Customer } from "./customer/customer";
import { Owner } from "./owner/owner";
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, Navigation, Home, Topbar, Customer, Owner,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stayzee-frontend');
}
