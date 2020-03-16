import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/user/services/data.service';
import { NestService } from 'src/app/user/services/nest.service';

import { NestPokemon } from './../../models/nest';



@Component({
  selector: 'app-nest-form',
  templateUrl: './nest-form.component.html',
  styleUrls: ['./nest-form.component.css']
})
export class NestFormComponent implements OnInit {

  date_from = '';
  date_to = '';


  searchActive : boolean = false;
  placeholder : string = 'Ingrese nombre';
  nest : Array<NestPokemon>;

  constructor(private data_pokemons: DataService, private nestServices:NestService ) { }
    
  ngOnInit() {
    this.data_pokemons.selectPokemon = new NestPokemon();
  }


  public buscarPokemon(){
    this.searchActive = true;
    let pokemons = [];
    if(this.data_pokemons.selectPokemon.name == ''){
      pokemons = this.data_pokemons.pokemons_borrador;
      this.searchActive = false;
    }else{
      this.data_pokemons.pokemons = [];
      this.data_pokemons.pokemons_borrador_search.forEach(element => {
        if(element['name'].substr(0,this.data_pokemons.selectPokemon.name.length) == this.data_pokemons.selectPokemon.name.toLowerCase()){
          pokemons.push(element);
        }
      });
    }
    this.data_pokemons.pokemons = pokemons;
  }

  public resetVariables(){
    /*this.placeholder = 'Ingrese nombre';*/
    this.data_pokemons.selectPokemon = new NestPokemon();
  }

  public changeImage(img){
    this.data_pokemons.pokemons = [];
    this.searchActive = false;
  }

  public changeText(pokemon){
      this.data_pokemons.selectPokemon.img = pokemon['img'];
      this.data_pokemons.selectPokemon.name = pokemon['name'];
      this.data_pokemons.selectPokemon.id = pokemon['id'];
  }

  public saveDate(date_from,date_to){
    this.data_pokemons.date_borrador = {'date_from': date_from, 'date_to': date_to}
  }

  public saveNest(nestPokemon: NestPokemon){
    if(nestPokemon['$key'] != null){
      this.nestServices.edit(nestPokemon['$key'],nestPokemon);
    }else{
      this.nestServices.addNest(nestPokemon); 
    }
    this.resetVariables();
  }

}
