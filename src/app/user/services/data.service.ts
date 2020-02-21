import { Injectable } from '@angular/core';
import { PokemonApiService } from './../../user/services/pokemon-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pokemons_borrador: any[];
  pokemonsFinal = [];
  pokemons = [];
  imaga_pokemon : any[];
  nombrePokemon = '';
  nido:boolean; galeria:boolean; bucador:boolean = false;

  constructor(private pokemonApi: PokemonApiService) { }

  public getPokemons(offset,limit){
    this.galeria = true;
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
}
