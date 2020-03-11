import { Component, OnInit} from '@angular/core';
import { PokemonComponent } from './../pokemon/pokemon.component';
import { MatDialog} from '@angular/material';

import { DataService } from 'src/app/user/services/data.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  generations = {'1': {'inicio': 0,'fin': 151},
                 '2': {'inicio': 151,'fin': 100},
                 '3': {'inicio': 251,'fin': 135},
                 '4': {'inicio': 386,'fin': 107},
                 '5': {'inicio': 493,'fin': 156},};

  constructor(private data_pokemons: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openDialog(id): void {
    this.data_pokemons.pokemon_id = id;
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '550px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
