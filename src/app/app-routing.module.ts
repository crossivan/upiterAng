import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./services/auth.guard";
import { PrintPageComponent } from "./pages/print-page/print-page.component";
import { AboutPageComponent } from "./pages/about-page/about-page.component";
import { TachoPageComponent } from "./pages/tacho-page/tacho-page.component";
import { CeramPageComponent } from "./pages/ceram-page/ceram-page.component";
import { PhotodocPageComponent } from "./pages/photodoc-page/photodoc-page.component";

const routes: Routes = [
  { path: 'photodoc', component: PhotodocPageComponent },
  { path: 'print', component: PrintPageComponent },
  { path: 'ceram', component: CeramPageComponent, canActivate: [AuthGuard] },
  { path: 'tacho', component: TachoPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: 'print'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
