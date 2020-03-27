import { Component, OnInit } from '@angular/core';
import { environment } from "./../../../environments/environment";

import { NestService } from 'src/app/user/services/nest.service'

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  map: Mapboxgl.Map;



  constructor(private nest_service: NestService) { }

  ngOnInit() {
    this.initializeMap();
    this.createIconsMap();
  }

  private initializeMap(){
    this.map = new Mapboxgl.Map({
      container: 'map-box', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken : environment.maxboxKey,
      center: [-57.954604, -34.921328], // lng,lat starting position
      zoom: 12 // starting zoom
    });

  }

  private createIconsMap(){
    this.nest_service.getNests().valueChanges().subscribe(data =>{
      data.forEach(element => {
        this.createMarkWithIcon(element);
      });
    });
  }

  private createMarkWithIcon(nest){
    let element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = 'url(' + nest.img + ')';
    let marker = new Mapboxgl.Marker(element).setLngLat([nest.lng , nest.lat]).addTo(this.map); 
  }

}
