import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonApiService } from './user/services/pokemon-api.service';
import { DataService } from './user/services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MenuComponent } from './shared/menu/menu.component';
import { GenerationComponent } from './pages/generation/generation.component';
import { NestComponent } from './pages/nest/nest.component';
import { GaleryComponent } from './shared/galery/galery.component';
import { ComponentsComponent } from './user/components/components.component';
import { PokemonComponent } from './shared/pokemon/pokemon.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    MenuComponent,
    GenerationComponent,
    NestComponent,
    GaleryComponent,
    ComponentsComponent,
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
    MatMenuModule
  ],

  entryComponents: [PokemonComponent, NestComponent],
  providers: [PokemonApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
