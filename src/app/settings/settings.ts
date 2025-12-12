import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SettingsService } from '../services/settings.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TtsService } from '../services/tts.service';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';                 
@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, TranslatePipe, FormsModule],
    templateUrl: './settings.html',
    styleUrls: ['./settings.scss']
})
export class Settings implements OnInit {
goBack() {
    this.router.navigate(['home']); 
        
}
    
    isDarkMode = false;
    currentLanguage = 'en';
    currentVolume = 1;
    mapUrl: SafeResourceUrl | null = null;

    

    // இங்கே Router inject பண்ணணும்!!!
    constructor(
        private settingsService: SettingsService,
        private ttsService: TtsService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private sanitizer: DomSanitizer,
        private router: Router                             
    ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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