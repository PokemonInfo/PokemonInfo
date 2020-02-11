import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './../pokemon-api.service';
import { DomSanitizer} from '@angular/platform-browser';
import { PokemonComponent } from './../pokemon/pokemon.component';
import { MatDialog } from '@angular/material/dialog';

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
    var pokemons = [];
    this.pokemons = [];
    this.pokemons_borrador.forEach(element => {
      if(element['name'].substr(0,this.nombrePokemon.length) == this.nombrePokemon.toLowerCase()){
        pokemons.push(element);
      }
    });
    console.log(pokemons);
    this.pokemons = pokemons;
  }

}

  