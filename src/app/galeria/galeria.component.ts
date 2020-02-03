import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './../pokemon-api.service';
import { DomSanitizer} from '@angular/platform-browser';
import { PokemonComponent } from './../pokemon/pokemon.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  pokemons_borrador: any[];
  pokemons : any[];
  imaga_pokemon : any[];
  offset = 0;
  limit = 0;
  buscador = false;
  nombrePokemon = '';

  constructor(private pokemonApi: PokemonApiService, private sanitizer:DomSanitizer,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getPokemons(1); 
  }

  public getPokemons(generacion){
    this.pokemonApi.getPokemons(generacion).subscribe(data =>{
        /*this.pokemons_borrador = data.results;
        this.pokemons_borrador.forEach(element => {
          this.pokemons[i] = {'name':element['name'],'url':element['url'],'id':id+1};
          i++;
          id++;
        });
        this.pokemons_borrador = this.pokemons;
    });*/
    let i = 0;
    data['pokemon_species'].forEach(element => {
      element.forEach(element => {
        this.pokemons.push({
          'name':element['name'],
          'url':,
          'id':,
        });
      })   
    });
    /*this.pokemons_borrador = this.pokemons;*/
    console.log(data);
    });
  }

  public openDialog(id): void {
    this.pokemonApi.cargarId(id);
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '600px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public buscarPokemon(){
    var pokemons = [];
    this.pokemons = [];
    this.pokemons_borrador.forEach(element => {
      if(element['name'].substr(0,this.nombrePokemon.length) == this.nombrePokemon.toLowerCase()){
        pokemons.push(element);
      }
    });
    this.pokemons = pokemons;
  }
}
