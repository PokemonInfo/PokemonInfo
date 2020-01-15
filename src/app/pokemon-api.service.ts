import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

const URL_LISTAPOKEMONS = "https://pokeapi.co/api/v2/pokemon-form";
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const URL_TYPES = "https://pokeapi.co/api/v2/type/";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  id: '';

  constructor(private httpClient: HttpClient) { }

  getPokemons(offset, limit): Observable <any>{
    var url = URL_LISTAPOKEMONS+'?offset=' + offset + '&limit=' + limit;
    return this.httpClient.get(url);
  }

  getPokemon(): Observable <any>{
    var url = URL_POKEMON+this.id+'/';
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
