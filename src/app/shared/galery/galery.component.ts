import { Component, OnInit , Input} from '@angular/core';
import { PokemonComponent } from './../pokemon/pokemon.component';
import { MatDialog} from '@angular/material';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from 'src/app/user/services/data.service';
import {PokemonApiService} from './../../user/services/pokemon-api.service'
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

   generations = {1: {'inicio': 0,'fin': 151},
                  2: {'inicio': 151,'fin': 100},
                  3: {'inicio': 251,'fin': 135},
                  4: {'inicio': 386,'fin': 107},
                  5: {'inicio': 493,'fin': 156},};

  constructor(private data_pokemons: DataService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private pokemonApi: PokemonApiService ){ }

  ngOnInit() {
    this.data_pokemons.search$.subscribe((search:any)=>{
      if (!search.isSearch){ 
        this.data_pokemons.pokemons = this.data_pokemons.pokemons_borrador ;
        return
      }
      
      this.pokemonApi.getPokemons(0,-1).pipe(
        map( data => data.filter( pokemon => pokemon.name.substr(0,search.text.length) == search.text.toLowerCase()))
      ).subscribe(
        data => {this.data_pokemons.pokemons = data}
      )

    })

    this.route.params.subscribe(params => {
      const offset = this.generations[params['gen']]['inicio']
      const limit  = this.generations[params['gen']]['fin']
      this.pokemonApi.getPokemons(offset,limit).subscribe(
        data => {
          this.data_pokemons.pokemons = data;
          this.data_pokemons.pokemons_borrador = data;
        }
      )
    });
  }

  public openDialog(id): void {
    this.data_pokemons.pokemon_id = id;
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '550px',
      height: '650px',
      id:id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
