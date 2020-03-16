import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/user/services/data.service';
import { NestService } from 'src/app/user/services/nest.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  nests = [];

  constructor(private nest_service: NestService,private data_pokemons: DataService) {
   }

  ngOnInit() {
    let myPokemon;
    this.nest_service.getNests().snapshotChanges().subscribe(data =>{
      this.nests = [];
      data.forEach(pokemon => {
        myPokemon = pokemon.payload.val();
        myPokemon["$key"] = pokemon.key;
        this.nests.push(myPokemon)
      });
    });

  }

  public delete($key){
    this.nest_service.deleteNest($key)
    
  }

  public removeAll(){
    this.nest_service.removeAll();
  }

  public edit(nest){
    this.data_pokemons.selectPokemon = nest;
  }

}
