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

  generation: string;
  nombrePokemon = '';
  generations = {'1': {'inicio': 0,'fin': 151},
                  '2': {'inicio': 151,'fin': 100},
                  '3': {'inicio': 251,'fin': 135},
                  '4': {'inicio': 386,'fin': 107},
                  '5': {'inicio': 493,'fin': 156},};

  constructor(public data: GenerationComponent,
              private data_pokemons: DataService,
              private pokemonApi: PokemonApiService) { }

  ngOnInit() {
    this.getPokemons(this.generations[1]['inicio'],this.generations[1]['fin'],false); 
    this.getPokemons(0,649,true); 
  }

  public loadGeneration(gen){
    this.getPokemons(this.generations[gen]['inicio'],this.generations[gen]['fin'],false); 
  }

  private getPokemons(offset,limit,search){
    let pokemons = [];
    this.data_pokemons.pokemons = [];
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
                if(search){
                  this.data_pokemons.pokemons_borrador_search = pokemons;
                }else{
                  this.data_pokemons.pokemons = pokemons;
                  this.data_pokemons.pokemons_borrador = pokemons;
                }
            }
          )}
      )}
    )
  }

  public clear(){
    this.nombrePokemon = '';
    this.buscarPokemon();
  }

  public buscarPokemon(){
    let pokemons = [];

    if(this.nombrePokemon == ''){
      pokemons= this.data_pokemons.pokemons_borrador;
    }else{
      this.data_pokemons.pokemons = [];
      this.data_pokemons.pokemons_borrador_search.forEach(element => {
        if(element['name'].substr(0,this.nombrePokemon.length) == this.nombrePokemon.toLowerCase()){
          pokemons.push(element);
        }
      });
    }
    this.data_pokemons.pokemons = pokemons;
  }

}
