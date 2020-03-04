import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/user/services/data.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {


  constructor(private data_pokemons: DataService) { }

  ngOnInit() {
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
