import { Injectable } from '@angular/core';
import { NestPokemon } from './../../models/nest';
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  pokemons:any = [];
  pokemons_borrador:any = [];
  pokemons_borrador_search:any = [];
  selectPokemon: NestPokemon;

  pokemon_id: any = [];

  date_actual: any = [];
  date_borrador: any = [];

  searchBS = new BehaviorSubject('')
  search$  = this.searchBS.asObservable();

  constructor() {

  }

  changeSearch(search){
    this.searchBS.next(search)
  }
  
}
