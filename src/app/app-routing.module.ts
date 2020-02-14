import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';

const routes: Routes = [
  {path: 'generacion/:gen', component: GaleriaComponent},
  {path: 'nido/:nido', component: GaleriaComponent},
  {path: '**', pathMatch: 'full', redirectTo:  'generacion/1'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
