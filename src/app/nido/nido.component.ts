import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-nido',
  templateUrl: './nido.component.html',
  styleUrls: ['./nido.component.css']
})
export class NidoComponent implements AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = -34.9204529;
  lng = -57.9881898;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 12
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }
}
