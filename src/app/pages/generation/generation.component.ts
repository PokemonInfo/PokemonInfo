import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonApiService } from './../../user/services/pokemon-api.service';
import { DataService } from 'src/app/user/services/data.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {

  /*generations = {'1': {'inicio': 0,'fin': 151},
                  '2': {'inicio': 151,'fin': 100},
                  '3': {'inicio': 251,'fin': 135},
                  '4': {'inicio': 386,'fin': 107},
                  '5': {'inicio': 493,'fin': 156},};*/

  constructor(private pokemonApi: PokemonApiService,
              private data_pokemons: DataService,
              private rutaActiva: ActivatedRoute,) { }
  
  ngOnInit() {
      /*let gen = this.rutaActiva.snapshot.params.gen;
      this.getPokemons(this.generations[gen]['inicio'],this.generations[gen]['fin'],false); 
      this.getPokemons(0,649,true); */
  }

  /*getPokemons(offset,limit,search){
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
  }*/

}

  
