import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private darkModeSubject = new BehaviorSubject<boolean>(false);
    darkMode$ = this.darkModeSubject.asObservable();

    private languageSubject = new BehaviorSubject<string>('en');
    language$ = this.languageSubject.asObservable();

    getCurrentLanguage(): string {
        return this.languageSubject.value;
    }

    private locationSubject = new BehaviorSubject<{ lat: number, lng: number }>({ lat: 9.6649, lng: 80.0206 }); // Selva Cinema, Jaffna
    location$ = this.locationSubject.asObservable();

    private translations: any = {
        en: {
            SETTINGS: 'Settings',
            DARK_MODE: 'Dark Mode',
            SWITCH_THEME: 'Switch between light and dark themes',
            LANGUAGE: 'Language',
            SELECT_LANG: 'Select your preferred language',
            VOLUME: 'Voice Volume',
            ADJUST_VOLUME: 'Adjust the speech volume',
            LOCATION_SETTING: 'Location',
            CHANGE_LOCATION: 'Click map to view on Google Maps',
            HOME: 'Home',
            CUSTOMER: 'Customer',
            HOMES_MANAGEMENT: 'Homes Management',
            OWNERS: 'Owners',
            ADMIN_PANEL: 'Admin Panel',
            PROFILE: 'Profile',
            LOGOUT: 'Logout',
            // Admin Terms
            USERS_MANAGEMENT: 'Users Management',
            ID: 'ID',
            NAME: 'Name',
            EMAIL: 'Email',
            STATUS: 'Status',
            ACTIONS: 'Actions',
            BLOCK: 'Block',
            UNBLOCK: 'Unblock',
            ACTIVE: 'Active',
            BLOCKED: 'Blocked',
            PENDING_HOMES: 'Pending Homes',
            LOCATION: 'Location',
            PRICE: 'Price',
            APPROVE: 'Approve',
            REJECT: 'Reject',
            ADDRESS: 'Address',
            RENTALS: 'Rentals',
            ACCOUNT_NUMBER: 'Account Number',
            TTS_CUSTOMERS: 'Reading customer list',
            TTS_USERS: 'Reading user management list',
            TTS_HOMES: 'Reading pending homes list',
            TTS_RENTALS: 'Reading rentals list'
        },
        ta: {
            SETTINGS: 'அமைப்புகள்',
            DARK_MODE: 'இருண்ட பயன்முறை',
            SWITCH_THEME: 'வெளிச்சம் மற்றும் இருண்ட கருப்பொருள்களுக்கு இடையில் மாறவும்',
            LANGUAGE: 'மொழி',
            SELECT_LANG: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
            VOLUME: 'குரல் ஒலியளவு',
            ADJUST_VOLUME: 'பேச்சு ஒலியளவை சரிசெய்யவும்',
            LOCATION_SETTING: 'இடம்',
            CHANGE_LOCATION: 'Google Maps இல் பார்க்க கிளிக் செய்யவும்',
            HOME: 'முகப்பு',
            CUSTOMER: 'வாடிக்கையாளர்',
            HOMES_MANAGEMENT: 'வீடுகள் நிர்வாகம்',
            OWNERS: 'உரிமையாளர்கள்',
            ADMIN_PANEL: 'நிர்வாகக் குழு',
            PROFILE: 'சுயவிவரம்',
            LOGOUT: 'வெளியேறு',
            // Admin Terms
            USERS_MANAGEMENT: 'பயனர்கள் மேலாண்மை',
            ID: 'அடையாளம்',
            NAME: 'பெயர்',
            EMAIL: 'மின்னஞ்சல்',
            STATUS: 'நிலை',
            ACTIONS: 'செயல்கள்',
            BLOCK: 'தடு',
            UNBLOCK: 'தடுப்பை நீக்கு',
            ACTIVE: 'செயலில்',
            BLOCKED: 'தடுக்கப்பட்டது',
            PENDING_HOMES: 'நிலுவையில் உள்ள வீடுகள்',
            LOCATION: 'இடம்',
            PRICE: 'விலை',
            APPROVE: 'ஏற்றுக்கொள்',
            REJECT: 'நிராகரி',
            ADDRESS: 'முகவரி',
            RENTALS: 'வாடகைகள்',
            ACCOUNT_NUMBER: 'கணக்கு எண்',
            TTS_CUSTOMERS: 'வாடிக்கையாளர் பட்டியலைப் படிக்கிறது',
            TTS_USERS: 'பயனர் மேலாண்மை பட்டியலைப் படிக்கிறது',
            TTS_HOMES: 'நிலுவையில் உள்ள வீடுகள் பட்டியலைப் படிக்கிறது',
            TTS_RENTALS: 'வாடகை பட்டியலைப் படிக்கிறது'
        },
        si: {
            SETTINGS: 'සැකසුම්',
            DARK_MODE: 'අඳුරු මාදිලිය',
            SWITCH_THEME: 'ආලෝකය සහ අඳුරු තේමා අතර මාරු වන්න',
            LANGUAGE: 'භාෂාව',
            SELECT_LANG: 'ඔබේ කැමති භාෂාව තෝරන්න',
            VOLUME: 'හඬ පරිමාව',
            ADJUST_VOLUME: 'කථන පරිමාව සකස් කරන්න',
            LOCATION_SETTING: 'ස්ථානය',
            CHANGE_LOCATION: 'Google Maps හි බැලීමට ක්ලික් කරන්න',
            HOME: 'මුල් පිටුව',
            CUSTOMER: 'පාරිභෝගික',
            HOMES_MANAGEMENT: 'නිවාස කළමනාකරණය',
            OWNERS: 'හිමිකරුවන්',
            ADMIN_PANEL: 'පරිපාලන පුවරුව',
            PROFILE: 'පැතිකඩ',
            LOGOUT: 'ඉවත් වන්න',
            // Admin Terms
            USERS_MANAGEMENT: 'පරිශීලක කළමනාකරණය',
            ID: 'හැඳුනුම්පත',
            NAME: 'නම',
            EMAIL: 'විද්යුත් තැපෑල',
            STATUS: 'තත්වය',
            ACTIONS: 'ක්රියා',
            BLOCK: 'අවහිර කරන්න',
            UNBLOCK: 'අවහිර කිරීම ඉවත් කරන්න',
            ACTIVE: 'ක්රියාකාරී',
            BLOCKED: 'අවහිර කර ඇත',
            PENDING_HOMES: 'වගකීම් නිවාස',
            LOCATION: 'ස්ථානය',
            PRICE: 'මිල',
            APPROVE: 'අනුමත කරන්න',
            REJECT: 'ප්රතික්ෂේප කරන්න',
            ADDRESS: 'ලිපිනය',
            RENTALS: 'කුලී',
            ACCOUNT_NUMBER: 'ගිණුම් අංකය',
            TTS_CUSTOMERS: 'පාරිභෝගික ලැයිස්තුව කියවමින්',
            TTS_USERS: 'පරිශීලක කළමනාකරණ ලැයිස්තුව කියවමින්',
            TTS_HOMES: 'වගකීම් නිවාස ලැයිස්තුව කියවමින්',
            TTS_RENTALS: 'කුලී ලැයිස්තුව කියවමින්'
        }
    };

    constructor() {
        this.loadSettings();
    }


    private loadSettings() {
        if (typeof localStorage !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                this.setDarkMode(true);
            }

            const savedLang = localStorage.getItem('language');
            if (savedLang) {
                this.languageSubject.next(savedLang);
            }

            const savedLoc = localStorage.getItem('location');
            if (savedLoc) {
                try {
                    this.locationSubject.next(JSON.parse(savedLoc));
                } catch (e) {
                    // Ignore error
                }
            }
        }
    }

    setDarkMode(isDark: boolean) {
        this.darkModeSubject.next(isDark);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        if (typeof document !== 'undefined') {
            if (isDark) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    }

    setLanguage(lang: string) {
        this.languageSubject.next(lang);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('language', lang);
        }
    }

    setLocation(lat: number, lng: number) {
        const loc = { lat, lng };
        this.locationSubject.next(loc);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('location', JSON.stringify(loc));
        }
    }


    getTranslation(key: string): string {
        const lang = this.languageSubject.value;
        return this.translations[lang]?.[key] || key;
    }
}
