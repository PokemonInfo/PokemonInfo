import { Injectable } from '@angular/core';

import { Pokemon } from '../../models/pokemon';
import { PokemonApiService } from './../services/pokemon-api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemon : Pokemon;

  constructor(private pokemonApi:PokemonApiService) { 
    
  }

  public createPokemon(id): Pokemon {
    let pokemon_info;
    this.pokemonApi.getPokemon(id).subscribe(
      data =>{
        pokemon_info = data; 
      },
      err =>{},
      ()=>{
        this.pokemon = new Pokemon(id,pokemon_info, this.pokemonApi);
        return this.pokemon;
      });
      return this.pokemon;
  }

  
}
