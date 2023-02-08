import {NgModule, Provider} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {LoginComponent} from './components/login/login.component';
import {ModalComponent} from './components/modal/modal.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {AppRoutingModule} from './app-routing.module';
import {DragdropDirective} from './directive/dragdrop.directive';
import {AuthBlockComponent} from './components/auth-block/auth-block.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {TachoPageComponent} from './pages/tacho-page/tacho-page.component';
import {PrintPageComponent} from './pages/print-page/print-page.component';
import {PhotoCardComponent} from './components/photo-card/photo-card.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {RitualPageComponent} from './pages/ritual-page/ritual-page.component';
import {PhotoEditorComponent} from './components/photo-editor/photo-editor.component';
import {PriceForDocComponent} from './components/price-for-doc/price-for-doc.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {PhotodocPageComponent} from './pages/photodoc-page/photodoc-page.component';
import {AuthInterceptor} from "./services/auth.interceptor";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AboutPageComponent,
    AppComponent,
    AuthBlockComponent,
    DragdropDirective,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MainLayoutComponent,
    MenuComponent,
    ModalComponent,
    PhotoCardComponent,
    PhotodocPageComponent,
    PhotoEditorComponent,
    PriceForDocComponent,
    PrintPageComponent,
    RegistrationComponent,
    RitualPageComponent,
    TachoPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
    MatProgressBarModule,
    MatSelectModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MenuComponent
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
