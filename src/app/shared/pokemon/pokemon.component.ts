import { Component, OnInit , Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { DataService } from 'src/app/user/services/data.service';
import { PokemonService } from 'src/app/user/services/pokemon.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
 
  is_shiny: boolean = true;
  change_shiny : string = 'Shiny';

  constructor(private data: DataService,
              private pokemonService: PokemonService,
              public dialogRef: MatDialogRef<PokemonComponent>) { }

  ngOnInit() {
    this.pokemonService.createPokemon(this.data.pokemon_id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public changeImage(){
    if(this.is_shiny){
      $('.image_default').css('display', 'none');
      $('.image_shiny').css('display', 'block');
      this.change_shiny = 'Shiny';
    }else{
      $('.image_shiny').css('display', 'none');
      $('.image_default').css('display', 'block');
      this.change_shiny = 'Default';
    }
    this.is_shiny = !this.is_shiny;
  }

  resize(){
    let widthBrowser = window.outerWidth;
    let heightBrowser = window.outerHeight;
    console.log(widthBrowser);
  }

  public change_pokemon(id){
    this.pokemonService.createPokemon(id);
  }
}

