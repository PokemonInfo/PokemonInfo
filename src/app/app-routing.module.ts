import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
  {path: '', component: GaleriaComponent},
  {path: 'info', component: PokemonComponent},
  {path: '**', pathMatch: 'full', redirectTo:  'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
