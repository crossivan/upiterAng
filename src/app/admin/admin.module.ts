import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
// import {AppModule} from "../app.module";

@NgModule({
  declarations: [
    MainPageComponent,
    LoginPageComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/auth-block', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'main', component: MainPageComponent },
        ]
      }
    ]),
  ],
  exports: [RouterModule]
})
export class AdminModule { }
