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


  constructor() { }

  ngOnInit() {
  }

  

}
