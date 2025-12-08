import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TtsService {
    private synthesis: SpeechSynthesis | null = null;
    private voices: SpeechSynthesisVoice[] = [];
    public voicesLoaded$ = new BehaviorSubject<boolean>(false);
    private volumeSubject = new BehaviorSubject<number>(1);
    volume$ = this.volumeSubject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.synthesis = window.speechSynthesis;
            this.loadVoices();

            if (this.synthesis && this.synthesis.onvoiceschanged !== undefined) {
                this.synthesis.onvoiceschanged = () => this.loadVoices();
            }

            // Load volume from local storage if available
            const savedVolume = localStorage.getItem('ttsVolume');
            if (savedVolume) {
                this.volumeSubject.next(parseFloat(savedVolume));
            }
        }
    }

    private loadVoices() {
        if (!this.synthesis) return;
        this.voices = this.synthesis.getVoices();
        if (this.voices.length > 0) {
            this.voicesLoaded$.next(true);
        }
    }

    speak(text: string, lang: string = 'en') {
        if (!text || !this.synthesis) return;
        this.stop(); // Stop any current speech

        const utterance = new SpeechSynthesisUtterance(text);

        // Attempt to select a voice matching the language
        // 'si' might not have a direct match on many systems, fallback logic is important
        const targetLang = this.mapLanguageCode(lang);

        utterance.lang = targetLang;

        // Try to find a specific voice for the language
        const voice = this.voices.find(v => v.lang.startsWith(targetLang));
        if (voice) {
            utterance.voice = voice;
        }

        this.synthesis.speak(utterance);
    }

    setVolume(volume: number) {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        this.volumeSubject.next(clampedVolume);
        if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
            localStorage.setItem('ttsVolume', clampedVolume.toString());
        }
    }

    stop() {
        if (this.synthesis) {
            this.synthesis.cancel();
        }
    }

    private mapLanguageCode(appLang: string): string {
        switch (appLang) {
            case 'ta': return 'ta-IN'; // Tamil (India)
            case 'si': return 'si-LK'; // Sinhala (Sri Lanka) - Support varies by OS
            case 'en':
            default: return 'en-US';
        }
    }
}
