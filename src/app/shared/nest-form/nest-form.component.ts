import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/user/services/data.service';

@Component({
  selector: 'app-nest-form',
  templateUrl: './nest-form.component.html',
  styleUrls: ['./nest-form.component.css']
})
export class NestFormComponent implements OnInit {

  date_from = '';
  date_to = '';

  nombrePokemon = '';
  idPokemon = '';
  lat = '';
  lon = '';

  searchActive : boolean = false;
  image : string = './../../../assets/images/another/nest-img.png';
  placeholder : string = 'Ingrese nombre';
  nest : any = [];

  constructor(private data_pokemons: DataService) { }

  ngOnInit() {
    this.nest = this.data_pokemons.nest_actuales;
  }


  public buscarPokemon(){
    this.searchActive = true;
    let pokemons = [];
    if(this.nombrePokemon == ''){
      this.image = './../../../assets/images/another/nest-img.png';
      pokemons= this.data_pokemons.pokemons_borrador;
      this.searchActive = false;
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

  public resetVariables(){
    this.image = './../../../assets/images/another/nest-img.png';
    this.placeholder = 'Ingrese nombre';
    this.nombrePokemon = '';
    this.idPokemon = '';
    this.lat = '';
    this.lon = '';
  }

  public changeImage(img){
    this.image = img;
    this.data_pokemons.pokemons = [];
    this.searchActive = false;
  }

  public changeText(pokemon){
      this.image = pokemon['img'];
      this.nombrePokemon = pokemon['name'];
      this.idPokemon = pokemon['id'];
  }

  public saveDate(date_from,date_to){
    this.data_pokemons.date_borrador = {'date_from': date_from, 'date_to': date_to}
  }

  public saveNest(){
    this.data_pokemons.nest_borrador.push({
      'id': this.idPokemon,
      'name': this.nombrePokemon,
      'image': this.image,
      'lon': this.lon,
      'lat': this.lat
    });
    this.resetVariables();
    this.data_pokemons.nest_actuales = this.data_pokemons.nest_borrador;
  }

}
