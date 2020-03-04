import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/user/services/data.service';
import { NestService } from 'src/app/user/services/nest.service'

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {


  constructor(private data_pokemons: DataService, private nest: NestService) { }

  ngOnInit() {
    /*this.data_pokemons.nest_actuales = this.nest.getNests().valueChanges();*/
    console.log(this.data_pokemons.nest_actuales)
  }

  public delete(index){
    this.data_pokemons.nest_borrador.splice((index),1);
  }

  public removeAll(current_nest){
    this.data_pokemons.nest_actuales = [];
    this.data_pokemons.nest_borrador = [];
    this.data_pokemons.date_actual = [];
    this.data_pokemons.date_borrador = [];
    
    console.log(this.data_pokemons.date_actual);
    console.log(this.data_pokemons.nest_actuales);
  }

  public saveAll(current_nest){
    this.data_pokemons.date_actual = this.data_pokemons.date_borrador;
    this.data_pokemons.nest_actuales = this.data_pokemons.nest_borrador;
    console.log(this.data_pokemons.date_actual);
    console.log(this.data_pokemons.nest_actuales);
  }

}
