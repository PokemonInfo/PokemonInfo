import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DataService } from 'src/app/user/services/data.service';
import { NestService } from 'src/app/user/services/nest.service';

import { NestPokemon } from './../../models/nest';

/*import * as mapboxgl from 'mapbox-gl'*/
import * as mapboxgl from 'mapbox-gl'
import { LayoutModule } from '@angular/cdk/layout';



@Component({
  selector: 'app-nest-form',
  templateUrl: './nest-form.component.html',
  styleUrls: ['./nest-form.component.css']
})
export class NestFormComponent implements OnInit,AfterViewInit {

  date_from = '';
  date_to = '';

  map:mapboxgl.Map;
  markDrag:mapboxgl.Marker;
  lngLatFocus:mapboxgl.LngLat = new mapboxgl.LngLat(-57.9556268,-34.921914);

  searchActive : boolean = false;
  placeholder : string = 'Ingrese nombre';
  nest : Array<NestPokemon>;

  constructor(private data_pokemons: DataService, private nestServices:NestService) {
    
   }
    
  ngOnInit() {
    this.data_pokemons.selectPokemon = new NestPokemon();
    
  }

  ngAfterViewInit(){
    this.map = new mapboxgl.Map({
      container: 'map',
      accessToken:'pk.eyJ1Ijoicm9iZXJ0b3N1YXJleiIsImEiOiJjazdvMHk3aWwwNHF0M29wMDBwOXVwemxnIn0.GjTOCQWTM6YITzw7cWCKKg',
      style: 'mapbox://styles/robertosuarez/ck7yxqeks1a3m1intu5ac8jhk',
      center: this.lngLatFocus,
      zoom: 13
    });  
    this.map.addControl(new mapboxgl.NavigationControl());  
    this.map.addControl(new mapboxgl.FullscreenControl());   

    this.markDrag = new mapboxgl.Marker({draggable:true})
    .setLngLat(this.lngLatFocus)
    .setDraggable(true)
    this.markDrag.addTo(this.map);
    this.markDrag.on('dragend', ()=>{
      this.data_pokemons.selectPokemon.lng = this.markDrag.getLngLat().lng.toString();
      this.data_pokemons.selectPokemon.lat = this.markDrag.getLngLat().lat.toString();
    });

    this.map.on("click",(e)=>{
      this.markDrag.remove();
      this.markDrag = new mapboxgl.Marker({draggable:true})
      .setLngLat(e.lngLat)
      .setDraggable(true)
      this.markDrag.addTo(this.map);
      this.data_pokemons.selectPokemon.lng = this.markDrag.getLngLat().lng.toString();
      this.data_pokemons.selectPokemon.lat = this.markDrag.getLngLat().lat.toString();
      this.markDrag.on('dragend', ()=>{
        this.data_pokemons.selectPokemon.lng = this.markDrag.getLngLat().lng.toString();
        this.data_pokemons.selectPokemon.lat = this.markDrag.getLngLat().lat.toString();
      });
    })
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

  /*public addMark(e){
    let latLng = [-34.91262391976197,-57.96644146674896] ;
    let markDrag = new mapboxgl.Marker().setLngLat(new mapboxgl.LngLat(latLng[1],latLng[0]))
    markDrag.addTo(this.map)
    console.log(e.lngLat);
    console.log(this.markDrag)
    console.log('click')
}*/

}
