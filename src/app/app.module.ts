import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PokemonApiService } from './user/services/pokemon-api.service';
import { DataService } from './user/services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './shared/menu/menu.component';
import { GenerationComponent } from './pages/generation/generation.component';
import { NestComponent } from './pages/nest/nest.component';
import { GaleryComponent } from './shared/galery/galery.component';
import { PokemonComponent } from './shared/pokemon/pokemon.component';


import { NestService } from './user/services/nest.service';

import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { MapComponent } from './shared/map/map.component';
import { NestFormComponent } from './shared/nest-form/nest-form.component';
import { DatesPipe } from './user/pipes/dates.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    MenuComponent,
    GenerationComponent,
    NestComponent,
    GaleryComponent,
    ControlPanelComponent,
    MapComponent,
    NestFormComponent,
    DatesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'PokemonInfo'),
    AngularFireDatabaseModule
  ],

  entryComponents: [PokemonComponent, NestComponent],
  providers: [PokemonApiService, DataService , NestService , DatePipe],

  bootstrap: [AppComponent]
})
export class AppModule { }
