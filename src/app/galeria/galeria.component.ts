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
  pokemons = [];
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
    this.pokemons = [];
    this.pokemonApi.getPokemons(generacion).subscribe(
      data =>{
        data['pokemon_species'].forEach(
          element => {
          this.pokemons.push({'name': element['name']})
          });
      },
      err => {},
      () =>{
          this.pokemons.forEach(pokemon => {
            this.pokemonApi.getPokemon(pokemon['name']).subscribe(data =>{
               pokemon.img = data['sprites']['front_default']
               pokemon.id  = data['id']
               if (pokemon == 'deoxys'){
                console.log(pokemon)
               }
               
              },
              err => {},
              () => {
                this.pokemons.sort(function (a, b) {
                  if (a.id > b.id) {
                    return 1;
                  }
                  if (a.id < b.id) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                })
            }
          )}
      )}
    )
    
    console.log(this.pokemons);
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

  