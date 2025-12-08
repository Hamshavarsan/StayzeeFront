// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';                    // nee App nu name pannirukka
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';   // <-- idhu must for [formGroup]
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    // Existing providers from appConfig
    ...appConfig.providers,

    // Additional providers (override or add)
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule)   // <-- idhu illana [formGroup] error varum!
  ]
})
.catch((err) => console.error(err));