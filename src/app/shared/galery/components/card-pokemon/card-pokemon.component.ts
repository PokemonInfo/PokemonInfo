import { Component, OnInit , Input } from '@angular/core';


@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {

  @Input() id:string;
  @Input() imgUrl:string;
  @Input() name:string;

  imgDefault = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"

  constructor() { }

  ngOnInit() {
  }

  hadlError(e){
    this.imgUrl = this.imgDefault
    console.log('no se pudo cargar la imagen')
  }

  

}
