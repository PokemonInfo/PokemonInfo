import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pokemons:any = [];
  pokemons_borrador:any = [];
  pokemons_borrador_search:any = [];

  pokemon_id: any = [];

  constructor() { }

  
}
