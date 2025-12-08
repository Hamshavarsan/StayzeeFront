import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { SettingsService } from '../../services/settings.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TtsButtonComponent } from '../../shared/tts-button/tts-button.component';

@Component({
    selector: 'app-admin-owner',
    standalone: true,
    imports: [CommonModule, TranslatePipe, TtsButtonComponent],
    templateUrl: './owner.component.html',
    styleUrl: './owner.component.scss'
})
export class AdminOwnerComponent implements OnInit {
    rentals: any[] = [];
    errorMessage: string = '';

    constructor(
        private adminService: AdminService,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.loadRentals();
    }

    loadRentals() {
        this.adminService.getAllRentals().subscribe({
            next: (data) => this.rentals = data,
            error: (err) => this.errorMessage = 'Failed to load rentals'
        });
    }
}
