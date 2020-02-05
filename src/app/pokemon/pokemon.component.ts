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
  debilidades = [];
  resistencias = [];
  cantidadDeTipo = 0;

  tableType:any[][]= [
    [0,"normal","fire","water","grass","electric","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"],
    ["normal"  ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,3 ,0 ,0 ,1 ,0 ],
    ["fire"    ,0 ,1 ,1 ,2 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,2 ,1 ,0 ,1 ,0 ,2 ,0 ],
    ["water"   ,0 ,2 ,1 ,1 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,2 ,0 ,1 ,0 ,0 ,0 ],
    ["grass"   ,0 ,1 ,2 ,1 ,0 ,0 ,0 ,1 ,2 ,1 ,0 ,1 ,2 ,0 ,1 ,0 ,1 ,0 ],
    ["electric",0 ,0 ,2 ,1 ,1 ,0 ,0 ,0 ,3 ,2 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ],
    ["ice"     ,0 ,1 ,1 ,2 ,0 ,1 ,0 ,0 ,2 ,2 ,0 ,0 ,0 ,0 ,2 ,0 ,1 ,0 ],
    ["fighting",2 ,0 ,0 ,0 ,0 ,2 ,0 ,1 ,0 ,1 ,1 ,1 ,2 ,3 ,0 ,2 ,2 ,1 ],
    ["poison"  ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,3 ,2 ],
    ["ground"  ,0 ,2 ,0 ,1 ,2 ,0 ,0 ,2 ,0 ,3 ,0 ,1 ,2 ,0 ,0 ,0 ,2 ,0 ],
    ["flying"  ,0 ,0 ,0 ,2 ,1 ,0 ,2 ,0 ,0 ,0 ,0 ,2 ,1 ,0 ,0 ,0 ,1 ,0 ],
    ["psychic" ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,2 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,3 ,1 ,0 ],
    ["bug"     ,0 ,1 ,0 ,2 ,0 ,0 ,1 ,1 ,0 ,1 ,2 ,0 ,0 ,1 ,0 ,2 ,1 ,1 ],
    ["rock"    ,0 ,2 ,0 ,0 ,0 ,2 ,1 ,0 ,1 ,2 ,0 ,2 ,0 ,0 ,0 ,0 ,1 ,0 ],
    ["ghost"   ,3 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,2 ,0 ,1 ,0 ,0 ],
    ["dragon"  ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,1 ,3 ],
    ["dark"    ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,2 ,0 ,0 ,2 ,0 ,1 ,0 ,1 ],
    ["steel"   ,0 ,1 ,1 ,0 ,1 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,1 ,2 ],
    ["fairy"   ,0 ,1 ,0 ,0 ,0 ,0 ,2 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,2 ,1 ,0 ],
  ];




  constructor(private pokemonApi: PokemonApiService, private sanitizer:DomSanitizer,
    public dialogRef: MatDialogRef<PokemonComponent>) { }

  ngOnInit() {
    this.getPokemonInfo();
  }

  public getPokemonInfo(){
    this.debilidades = [];
    this.resistencias  = [];
    this.pokemonApi.getPokemon(1).subscribe(data =>{
      this.pokemon_info = data;
      this.cantidadDeTipo = this.pokemon_info['types'].length;
      this.getDebilidadesyResistencias(this.pokemon_info['types']);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getDebilidadesyResistencias(types){
    let duplicado;
    let auxDebilidades = [];
    let debilidades = [];
    let resistencias = [];

    types.forEach(type => {
      debilidades = debilidades.concat(this.getDebilidades(type['type']['name']));
      resistencias = resistencias.concat(this.getresistencias(type['type']['name']));
    });

    debilidades.sort().forEach(element => {
      duplicado = false;
      resistencias.sort().forEach(element2 => {
        if (element == element2) {
          duplicado = true;
        }
      })
      if (duplicado == false){
        auxDebilidades.push(element);
      }else{
        resistencias.splice(resistencias.indexOf(element),1);
      }
    })

    this.debilidades  = this.agruparTipos(auxDebilidades);
    this.resistencias = this.agruparTipos(resistencias);   
    
    return;
  }

  private getDebilidades(type:string){
    return this.eficaciaDefensor(type,2);
  }

  private getresistencias(type:string){
    return (this.eficaciaDefensor(type,1).concat(this.eficaciaDefensor(type,3)));
  }

  private getDañoDoble(type:string){
    return this.eficaciaAtacante(type,2);
  }

  private getDañoMedio(type:string){
    return this.eficaciaAtacante(type,1).concat(this.eficaciaAtacante(type,3))
  }

  private eficaciaDefensor(type:string,eficacia) {
    let arreglo = [];
    for (let i = 0 ; i < this.tableType.length; i++) {
      if (this.tableType[0][i] == type) {
        for (let j = 1 ; j < this.tableType.length ; j++) {
          if (this.tableType[j][i] == eficacia){
            arreglo.push(this.tableType[j][0]);
            if(eficacia == 3){
              arreglo.push(this.tableType[j][0]);
            }
          }
        }
      }
    }
    return arreglo;
  }

  private eficaciaAtacante (type:string,eficacia) {
    let arreglo = [];
    for (let i = 0 ; i < this.tableType.length; i++) {
      /*console.log( this.tableType[i][0] + "==" + type);*/
      if (this.tableType[i][0] == type) {   
        for (let j = 1 ; j < this.tableType.length ; j++) {
          if (this.tableType[i][j] == eficacia){
            arreglo.push(this.tableType[0][j]);
            if (eficacia == 3){
              arreglo.push(this.tableType[0][j]);
            }
          }
        }
      }
    }
    return arreglo;
  }

  private agruparTipos(arreglo){
    let eficacias = [];
    arreglo.forEach(element => {
      if (eficacias.length == 0){
        eficacias.push({'type': element, 'count': 1})
      }else{
        if(eficacias[eficacias.length-1]['type'] == element ){
          eficacias[eficacias.length-1]['count'] += 1;
        }
        else{
          eficacias.push({'type': element, 'count': 1})
        }
      }
    }); 
    return eficacias;   
  }
  
}
