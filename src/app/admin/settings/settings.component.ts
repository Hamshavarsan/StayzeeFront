import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TtsService } from '../../services/tts.service';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';                 
@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, TranslatePipe, FormsModule],
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
goBack() {
    this.router.navigate(['home']); 
        
}
    
    isDarkMode = false;
    currentLanguage = 'en';
    currentVolume = 1;
    mapUrl: SafeResourceUrl | null = null;

    languages = [
        { code: 'en', name: 'English' },
        { code: 'ta', name: 'Tamil' },
        { code: 'si', name: 'Sinhala' }
    ];

    // இங்கே Router inject பண்ணணும்!!!
    constructor(
        private settingsService: SettingsService,
        private ttsService: TtsService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private sanitizer: DomSanitizer,
        private router: Router                             
    ) { }
    

    ngOnInit() {
        this.settingsService.darkMode$.subscribe(isDark => {
            this.isDarkMode = isDark;
        });

        this.settingsService.language$.subscribe(lang => {
            this.currentLanguage = lang;
        });

        this.ttsService.volume$.subscribe(vol => {
            this.currentVolume = vol;
        });

        this.settingsService.location$.subscribe(loc => {
            if (isPlatformBrowser(this.platformId)) {
                const url = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${loc.lat},${loc.lng}`;
                this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
        });
    }

   
    goToAddHomePage() {
        this.router.navigate(['/add-property']);
    }

    toggleTheme() {
        this.settingsService.setDarkMode(!this.isDarkMode);
    }

    changeLanguage(langCode: string) {
        this.settingsService.setLanguage(langCode);
    }

    onVolumeChange(event: any) {
        const volume = parseFloat(event.target.value);
        this.ttsService.setVolume(volume);
    }
}