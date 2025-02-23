import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./services/auth.guard";
import {PrintPageComponent} from "./pages/print-page/print-page.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {RitualPageComponent} from "./pages/ritual-page/ritual-page.component";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {PhotodocPageComponent} from "./pages/photodoc-page/photodoc-page.component";
import {OrdersPageComponent} from './pages/orders-page/orders-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      // {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: PhotodocPageComponent},
      {path: 'photo_doc', component: PhotodocPageComponent},
      {path: 'print', component: PrintPageComponent},
      {path: 'ceramics', component: RitualPageComponent, canActivate: [AuthGuard]},
      {path: 'about', component: AboutPageComponent},
      {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  },
  {
    path: '**', redirectTo: 'print'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
