import { Component, OnInit } from '@angular/core';
import { GenerationComponent } from './../../pages/generation/generation.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  generation: string;
  nombrePokemon = '';
  generaciones = {'gen_1': {'inicio': 0,'fin': 151},
                  'gen_2': {'inicio': 151,'fin': 100},
                  'gen_3': {'inicio': 251,'fin': 135},
                  'gen_4': {'inicio': 386,'fin': 107},
                  'gen_5': {'inicio': 493,'fin': 156},};

  constructor(public data: GenerationComponent) { }

  ngOnInit() {
  }

  loadGeneration(gen){
    this.generation = gen;
  }

  public buscarPokemon(){
    this.data.getPokemons(0,800);
    var pokemons = [];
    console.log(this.data.pokemons);
    this.data.pokemons = [];
    this.data.pokemons_borrador.forEach(element => {
      if(element['name'].substr(0,this.nombrePokemon.length) == this.nombrePokemon.toLowerCase()){
        pokemons.push(element);
      }
    });
    this.data.pokemons = pokemons;
  }
}
