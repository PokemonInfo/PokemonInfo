import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { PokemonComponent } from './pokemon/pokemon.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonApiService } from './pokemon-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { BuscadorPipe } from './buscador.pipe';
import { MenuCelularComponent } from './menu-celular/menu-celular.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GaleriaComponent,
    PokemonComponent,
    BuscadorPipe,
    MenuCelularComponent
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

  entryComponents: [PokemonComponent],
  providers: [PokemonApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
