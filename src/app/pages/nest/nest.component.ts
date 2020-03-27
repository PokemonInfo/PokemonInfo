import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { NestPokemon } from './../../models/nest';

import { NestService } from 'src/app/user/services/nest.service'
import { MapBoxService } from 'src/app/user/services/map-box.service';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.css']
})
export class NestComponent implements OnInit {

  @Output() zoom = new EventEmitter();
  nests : Array<NestPokemon>;

  constructor(private nest_service: NestService, private map:MapBoxService) {  
  }

  ngOnInit(){
    this.getNest();
  }

  private getNest(){
    this.nest_service.getNests().valueChanges().subscribe(data =>{
      this.nests = data; 
    });
  }

  public zoomMap(lng,lat){
    this.map.zoom(lng,lat);
  }

}