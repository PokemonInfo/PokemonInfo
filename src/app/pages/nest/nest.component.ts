import { Component, OnInit} from '@angular/core';

import { NestPokemon } from './../../models/nest';

import { NestService } from 'src/app/user/services/nest.service'

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.css']
})
export class NestComponent implements OnInit {

  nests : Array<NestPokemon>;

  constructor(private nest_service: NestService) {  
  }

  ngOnInit(){
    this.getNest();
  }

  private getNest(){
    this.nest_service.getNests().valueChanges().subscribe(data =>{
      this.nests = data; 
    });
  }

}