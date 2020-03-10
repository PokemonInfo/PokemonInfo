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

  /*nombrePokemon = '';
  idPokemon = '';
  lat = '';
  lon = '';*/

  searchActive : boolean = false;
  image : string = './../../../assets/images/another/nest-img.png';
  placeholder : string = 'Ingrese nombre';
  nest : Array<NestPokemon>;
  selectPokemon : NestPokemon;

  constructor(private data_pokemons: DataService, private nestServices:NestService ) { }

  ngOnInit() {
    this.selectPokemon = new NestPokemon();
  }


  public buscarPokemon(){
    this.searchActive = true;
    let pokemons = [];
    if(this.selectPokemon.name == ''){
      this.image = './../../../assets/images/another/nest-img.png';
      pokemons = this.data_pokemons.pokemons_borrador;
      this.searchActive = false;
    }else{
      this.data_pokemons.pokemons = [];
      this.data_pokemons.pokemons_borrador_search.forEach(element => {
        if(element['name'].substr(0,this.selectPokemon.name.length) == this.selectPokemon.name.toLowerCase()){
          pokemons.push(element);
        }
      });
    }
    this.data_pokemons.pokemons = pokemons;
  }

  public resetVariables(){
    this.image = './../../../assets/images/another/nest-img.png';
    this.placeholder = 'Ingrese nombre';
    this.selectPokemon = new NestPokemon();
  }

  public changeImage(img){
    this.image = img;
    this.data_pokemons.pokemons = [];
    this.searchActive = false;
  }

  public changeText(pokemon){
      this.selectPokemon.img = pokemon['img'];
      this.selectPokemon.name = pokemon['name'];
      this.selectPokemon.id = pokemon['id'];
  }

  public saveDate(date_from,date_to){
    this.data_pokemons.date_borrador = {'date_from': date_from, 'date_to': date_to}
  }

  public saveNest(nestPokemon: NestPokemon){
    this.nestServices.addNest(nestPokemon);
    this.resetVariables();
  }

}
