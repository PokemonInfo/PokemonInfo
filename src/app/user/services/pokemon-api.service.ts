import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators'


/*const URL_LISTAPOKEMONS = "https://pokeapi.co/api/v2/pokemon-form";*/
/*const URL_LISTAPOKEMONS = "https://pokeapi.co/api/v2/generation/";*/
const URL_LISTAPOKEMONS = "https://pokeapi.co/api/v2/pokemon-species"
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const URL_TYPES = "https://pokeapi.co/api/v2/type/";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  id: '';
  datos: any;

  constructor(private httpClient: HttpClient) { }

  getPokemons(offset,limit){
    const url = URL_LISTAPOKEMONS + "?offset=" + offset + "&limit=" + limit  /*+ generacion*/;
    let id = offset + 1;
    return this.httpClient.get(url).pipe(
      map((data) => {
        return data['results'].map((pokemon:any) =>{
            pokemon['img'] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            pokemon['id']  = id;
            id++;
            return pokemon
        })
      })
    )
  }

  getPokemon(idOrName): Observable <any>{
    var url = URL_POKEMON+idOrName;
    return this.httpClient.get(url);
  }

  getPokemonSpecie(url): Observable <any>{
    return this.getUrl(url);
  }

  public getUrl(url):Observable <any>{
    return this.httpClient.get(url);
  }

  getTypes(type){
    var url = URL_TYPES+type;
    return this.httpClient.get(url);
  }

  cargarId(id){
    this.id = id;
  }

  getIdCurrenPokemon(){
    return this.id;
  }
}
