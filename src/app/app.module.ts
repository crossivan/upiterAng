import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from "@angular/common/http";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { AppRoutingModule } from './app-routing.module';
import { DragdropDirective } from './directive/dragdrop.directive';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { TachoPageComponent } from './pages/tacho-page/tacho-page.component';
import { CeramPageComponent } from './pages/ceram-page/ceram-page.component';
import { PrintPageComponent } from './pages/print-page/print-page.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PhotodocPageComponent } from './pages/photodoc-page/photodoc-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DragdropDirective,
    AboutPageComponent,
    TachoPageComponent,
    CeramPageComponent,
    PrintPageComponent,
    PhotoCardComponent,
    PhotodocPageComponent,
    RegistrationComponent,
    PhotoEditorComponent,
    ModalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgSelectModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
