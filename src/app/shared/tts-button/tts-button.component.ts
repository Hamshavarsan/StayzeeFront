import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TtsService } from '../../services/tts.service';
import { SettingsService } from '../../services/settings.service';

@Component({
    selector: 'app-tts-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button (click)="speak()" class="tts-btn" [title]="'Read aloud'">
      🔊
    </button>
  `,
    styles: [`
    .tts-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.2rem 0.5rem;
      transition: transform 0.2s;
    }
    .tts-btn:hover {
      transform: scale(1.1);
    }
  `]
})
export class TtsButtonComponent {
    @Input() text: string = '';

    constructor(
        private ttsService: TtsService,
        private settingsService: SettingsService
    ) { }

    speak() {
        const currentLang = this.settingsService.getCurrentLanguage();
        this.ttsService.speak(this.text, currentLang);
    }
}
