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

<<<<<<< HEAD
  public getPokemons(offset, limit){
    this.offset = offset;
    this.limit = limit;
    this.pokemonApi.getPokemons(this.offset, limit).subscribe(data =>{
        this.pokemons_borrador = data.results;
        var i=0;
        var id=offset;
        this.pokemons = [];
        this.pokemons_borrador.forEach(element => {
          this.pokemons[i] = {'name':element['name'],'url':element['url'],'id':id+1};
          i++;
          id++;
        });
        this.pokemons_borrador = this.pokemons;
    });
=======
  public getPokemons(generacion){
    this.pokemons = [];
    this.pokemonApi.getPokemons(generacion).subscribe(
      data =>{
        data['pokemon_species'].forEach(
          element => {
          this.pokemons.push({'name': element['name'],'url': element['url']})
          });
      },
      err => {},
      () =>{
          this.pokemons.forEach(pokemon => {
            this.pokemonApi.getPokemonSpecie(pokemon['url']).subscribe(data =>{
               pokemon.img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data['id'] + ".png" 
               pokemon.id  = data['id']
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
    this.pokemons_borrador = this.pokemons;
>>>>>>> fix_grilla_de_pokemons
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

  