import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";

import * as Mapboxgl from 'mapbox-gl';
import { GeoJson } from 'src/app/models/geoJson';

@Injectable({
  providedIn: 'root'
})
export class MapBoxService {

  map: Mapboxgl.Map;

  constructor() { }

  public initializeMap(){
    this.map = new Mapboxgl.Map({
      container: 'map-box', // container id
      accessToken : environment.maxboxKey,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-57.954604, -34.921328], // lng,lat starting position
      zoom: 12 // starting zoom
    });

    return this.map;
  }

  public zoom(lng,lat){
    this.map.flyTo({ 
      zoom: 16,
      center: [lng,lat]
    });
  }
}
