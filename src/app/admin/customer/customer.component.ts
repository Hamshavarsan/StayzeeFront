import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { SettingsService } from '../../services/settings.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TtsButtonComponent } from '../../shared/tts-button/tts-button.component';

@Component({
    selector: 'app-admin-customer',
    standalone: true,
    imports: [CommonModule, TranslatePipe, TtsButtonComponent],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss'
})
export class AdminCustomerComponent implements OnInit {
    customers: any[] = [];
    errorMessage: string = '';

    constructor(
        private adminService: AdminService, // Note: Previous file might use AdminService or CustomerService, checking context
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.loadCustomers();
    }

    loadCustomers() {
        this.adminService.getAllCustomers().subscribe({
            next: (data) => this.customers = data,
            error: (err) => this.errorMessage = 'Failed to load customers'
        });
    }
}
