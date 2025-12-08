import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'translate',
    pure: false, // Impure to update when language changes
    standalone: true
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    private subscription: Subscription;
    private lastLang: string = '';

    constructor(private settingsService: SettingsService, private ref: ChangeDetectorRef) {
        this.subscription = this.settingsService.language$.subscribe(lang => {
            if (lang !== this.lastLang) {
                this.lastLang = lang;
                this.ref.markForCheck();
            }
        });
    }

    transform(key: string): string {
        return this.settingsService.getTranslation(key);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
