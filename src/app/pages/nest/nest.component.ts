import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {} from 'googlemaps';

//services
import { PokemonApiService } from './../../user/services/pokemon-api.service';
import { NestService } from '../../user/services/nest.service';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.css']
})
export class NestComponent implements AfterViewInit {

  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = -34.921470
  lng = -57.954801;
  
  PokeCoordinates = [];


  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 13.5
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  constructor(private pokemonApi: PokemonApiService,private db :NestService ) {  
  }

  ngOnInit(){
  }

  ngAfterViewInit() {
    this.db.getNests().valueChanges().subscribe(
      data => {
        data.forEach(element => {
          this.PokeCoordinates.push(element)
        });
        this.mapInitializer();
      })
  }
    

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.PokeCoordinates.forEach(element =>{
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(element.lat),parseFloat(element.lng)),
        map: this.map,
      });
      this.marker.setMap(this.map);
    })
  }
}