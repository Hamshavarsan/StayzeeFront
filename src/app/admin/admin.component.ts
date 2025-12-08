import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { SettingsService } from '../services/settings.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TtsButtonComponent } from '../shared/tts-button/tts-button.component';
import { AdminCustomerComponent } from './customer/customer.component';
import { AdminOwnerComponent } from './owner/owner.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, AdminCustomerComponent, AdminOwnerComponent, TranslatePipe, TtsButtonComponent],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    users: any[] = [];
    pendingHomes: any[] = [];
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private adminService: AdminService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.loadUsers();
        this.loadPendingHomes();
    }

    loadUsers() {
        this.adminService.getAllUsers().subscribe({
            next: (data) => this.users = data,
            error: (err) => this.errorMessage = 'Failed to load users'
        });
    }

    loadPendingHomes() {
        this.adminService.getPendingHomes().subscribe({
            next: (data) => this.pendingHomes = data,
            error: (err) => this.errorMessage = 'Failed to load pending homes'
        });
    }

    blockUser(id: number) {
        this.adminService.blockUser(id).subscribe({
            next: () => {
                this.successMessage = 'User blocked successfully';
                this.loadUsers();
            },
            error: () => this.errorMessage = 'Failed to block user'
        });
    }

    unblockUser(id: number) {
        this.adminService.unblockUser(id).subscribe({
            next: () => {
                this.successMessage = 'User unblocked successfully';
                this.loadUsers();
            },
            error: () => this.errorMessage = 'Failed to unblock user'
        });
    }

    approveHome(id: string) {
        this.adminService.approveHome(id).subscribe({
            next: () => {
                this.successMessage = 'Home approved successfully';
                this.loadPendingHomes();
            },
            error: () => this.errorMessage = 'Failed to approve home'
        });
    }

    rejectHome(id: string) {
        this.adminService.rejectHome(id).subscribe({
            next: () => {
                this.successMessage = 'Home rejected successfully';
                this.loadPendingHomes();
            },
            error: () => this.errorMessage = 'Failed to reject home'
        });
    }
}
