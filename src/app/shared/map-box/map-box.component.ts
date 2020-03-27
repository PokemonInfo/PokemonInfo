import { Component, OnInit, AfterViewInit } from '@angular/core';

import { NestService } from 'src/app/user/services/nest.service'

import * as Mapboxgl from 'mapbox-gl';
import { GeoJson } from 'src/app/models/geoJson';
import { MapBoxService } from 'src/app/user/services/map-box.service';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements AfterViewInit {

  map_box: Mapboxgl.Map;

  constructor(private nest_service: NestService, private map:MapBoxService) {
   }

  ngAfterViewInit() {
    this.map_box = this.map.initializeMap();
    this.createIconsMap(this.map_box);
  }

  private createIconsMap(map){
    let features;
    this.nest_service.getNests().valueChanges().subscribe(data =>{
      features = GeoJson.getGeoJsonNest('FeatureCollection',data);
      this.createMarkWithIcon(features,map);
    }); 
  } 

  private createMarkWithIcon(features,map){
    features.features.forEach(function(marker){
      let divMarker = document.createElement('div');
      divMarker.className = 'marker';
      divMarker.style.backgroundImage = 
      'url(' + marker.properties.image + ')';
      let divInfo = document.createElement('div');
      divInfo.style.display = 'none';
      divInfo.innerHTML = marker.properties.name;
      divMarker.addEventListener('click', function(event) {
        divInfo.style.display = 'block';
    });
      // add marker to map
      new Mapboxgl.Marker(divMarker)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new Mapboxgl.Popup({ offset: 15 }) // add popups
      .setHTML('<p>' + marker.properties.name + '</p>'))
      .addTo(map);
    });
  }

}
