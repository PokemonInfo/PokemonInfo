import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerationComponent } from './pages/generation/generation.component';
import { NestComponent } from './pages/nest/nest.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';

const routes: Routes = [
  {path: 'generacion/1', component: GenerationComponent},
  {path: 'generacion/2', component: GenerationComponent},
  {path: 'generacion/3', component: GenerationComponent},
  {path: 'generacion/4', component: GenerationComponent},
  {path: 'generacion/5', component: GenerationComponent},
  {path: 'nido/:nido', component: NestComponent},
  {path: 'control-panel', component: ControlPanelComponent},
  {path: '**', pathMatch: 'full', redirectTo:  'generacion/1'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
