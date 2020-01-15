import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './../pokemon-api.service';
import { DomSanitizer} from '@angular/platform-browser';
import {PokemonComponent} from './../pokemon/pokemon.component';
import {MatDialog} from '@angular/material/dialog';
import * as $ from "jquery";

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  pokemons : any[];
  imaga_pokemon : any[];
  offset = 0;
  limit = 0;
  buscador = false;
  nombrePokemon = '';

  constructor(private pokemonApi: PokemonApiService, private sanitizer:DomSanitizer,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getPokemons(0, 151); 
  }

  public getPokemons(offset, limit){
    this.offset = offset;
    this.limit = limit;
    this.pokemonApi.getPokemons(this.offset, limit).subscribe(data =>{
      if(this.nombrePokemon === ''){
        this.pokemons = data.results;
      }  
    });
  }

  openDialog(id): void {
    this.pokemonApi.cargarId(id);
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '300px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
