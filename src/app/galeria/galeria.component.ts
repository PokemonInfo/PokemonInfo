import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './../pokemon-api.service';
import { DomSanitizer} from '@angular/platform-browser';
import { PokemonComponent } from './../pokemon/pokemon.component';
import { NidoComponent } from './../nido/nido.component';
import { MatDialog} from '@angular/material';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  pokemons_borrador: any[];
  pokemonsFinal = [];
  pokemons = [];
  imaga_pokemon : any[];
  offset = 0;
  limit = 0;
  buscador = false;
  nombrePokemon = '';
  generaciones = {'gen_1': {'inicio': 0,'fin': 151},
                  'gen_2': {'inicio': 151,'fin': 100},
                  'gen_3': {'inicio': 251,'fin': 135},
                  'gen_4': {'inicio': 386,'fin': 107},
                  'gen_5': {'inicio': 493,'fin': 156},};

  constructor(private pokemonApi: PokemonApiService, private sanitizer:DomSanitizer,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getPokemons(0,151); 
  }

  getPokemons(offset,limit){
    let pokemons = [];
    this.pokemonsFinal = [];
    this.pokemonApi.getPokemons(offset,limit).subscribe(
      data =>{
        data['results'].forEach(
          element => {
            pokemons.push({'name': element['name'],'url': element['url']})
          });
      },
      err => {},
      () =>{
          pokemons.forEach(pokemon => {
            this.pokemonApi.getPokemonSpecie(pokemon['url']).subscribe(data =>{
               pokemon.img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data['id'] + ".png" 
               pokemon.id  = data['id']
              },
              err => {},
              () => {
                this.pokemons = pokemons;
                this.pokemons_borrador = this.pokemons;
            }
          )}
      )}
    )
  }

  public getMapaNidos(): void {
    const dialogRef = this.dialog.open(NidoComponent, {
      width: '900px',
      height: '530px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public openDialog(id): void {
    this.pokemonApi.cargarId(id);
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '600px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public buscarPokemon(){
    if(this.pokemons.length == 0){
      console.log('hola');

    }
    var pokemons = [];
    this.pokemons = [];
    this.pokemons_borrador.forEach(element => {
      if(element['name'].substr(0,this.nombrePokemon.length) == this.nombrePokemon.toLowerCase()){
        pokemons.push(element);
      }
    });
    this.pokemons = pokemons;
  }

}

  