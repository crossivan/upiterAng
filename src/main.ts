import {enableProdMode, importProvidersFrom, Provider} from '@angular/core';
import { environment } from './environments/environment';
import 'hammerjs';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth.interceptor';
import { Subs } from './app/utilities/subs';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app/app.component';
import {AuthService} from './app/services/auth.service';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, BrowserModule, FormsModule, MatProgressBarModule, MatSelectModule, NgSelectModule, ReactiveFormsModule),
        INTERCEPTOR_PROVIDER,
        Subs,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
}).catch(err => console.error(err));

