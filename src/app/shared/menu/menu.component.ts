import { Component, OnInit } from '@angular/core';
import { GenerationComponent } from './../../pages/generation/generation.component';

import { DataService } from 'src/app/user/services/data.service';
import { PokemonApiService } from './../../user/services/pokemon-api.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  search$ = this.data_pokemons.search$

  constructor(public data: GenerationComponent,
              private data_pokemons: DataService,
              private pokemonApi: PokemonApiService) { }

  ngOnInit() {
  }

  public buscarPokemon(name){
    console.log(name)
    const search = name == "" ? false : true
    this.data_pokemons.changeSearch({isSearch:search,text:name})
  }

}
