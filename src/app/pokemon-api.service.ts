import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

/*const URL_LISTAPOKEMONS = "https://pokeapi.co/api/v2/pokemon-form";*/
const URL_LISTAPOKEMONS = "https://pokeapi.co/api/v2/generation/";
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const URL_TYPES = "https://pokeapi.co/api/v2/type/";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  id: '';

  constructor(private httpClient: HttpClient) { }

  getPokemons(generacion): Observable <any>{
    var url = URL_LISTAPOKEMONS + generacion;
    return this.httpClient.get(url);
  }

  getPokemon(idOrName): Observable <any>{
    if(idOrName === null){
      idOrName= this.id;
    }
    var url = URL_POKEMON+idOrName;
    return this.httpClient.get(url);
  }

  getPokemonSpecie(url): Observable <any>{
    return this.httpClient.get(url);
  }

  getTypes(type){
    var url = URL_TYPES+type;
    return this.httpClient.get(url);
  }

  cargarId(id){
    this.id = id;
  }
}
