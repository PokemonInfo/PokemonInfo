import { Component, OnInit} from '@angular/core';
import { PokemonApiService } from './../pokemon-api.service';
import { DomSanitizer} from '@angular/platform-browser';
import {MatDialogRef} from '@angular/material/dialog';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon_info : any[];
  debilidades = new Set();
  fortalezas = new Set();
  cantidadDeTipo = 0;

  constructor(private pokemonApi: PokemonApiService, private sanitizer:DomSanitizer,
    public dialogRef: MatDialogRef<PokemonComponent>) { }

  ngOnInit() {
    this.getPokemonInfo();
  }

  public getPokemonInfo(){
    this.pokemonApi.getPokemon().subscribe(data =>{
      this.pokemon_info = data;
      this.cantidadDeTipo = this.pokemon_info['types'].length;
      this.pokemon_info['types'].forEach(element => {
        this.pokemonApi.getTypes(element['type']['name']).subscribe(data=>{
          console.log(data);
          this.cargarAtributos(data);
        })
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public cargarAtributos(data){
    if(this.cantidadDeTipo == 1){
      this.cargarDebildadUnTipo(data['damage_relations']);
      this.cargarFortalezaUnTipo(data['damage_relations']);
    }

  }

  public cargarDebildadUnTipo(debilidades){
    debilidades['double_damage_from'].forEach(element => {
      this.debilidades.add(element['name']);
    });
    debilidades['half_damage_to'].forEach(element => {
      this.debilidades.add(element['name']);
    });
  }

  public cargarFortalezaUnTipo(fortalezas){
    fortalezas['double_damage_to'].forEach(element => {
      this.fortalezas.add(element['name']);
    });
  }

}
