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

  
}
