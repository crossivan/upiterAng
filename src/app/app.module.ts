import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { TachoPageComponent } from './pages/tacho-page/tacho-page.component';
import { CeramPageComponent } from './pages/ceram-page/ceram-page.component';
import { PhotodocPageComponent } from './pages/photodoc-page/photodoc-page.component';
import { PrintPageComponent } from './pages/print-page/print-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    AboutPageComponent,
    TachoPageComponent,
    CeramPageComponent,
    PhotodocPageComponent,
    PrintPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
