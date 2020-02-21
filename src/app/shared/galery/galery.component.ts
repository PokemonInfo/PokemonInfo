import { Component, OnInit, Input } from '@angular/core';
import { PokemonApiService } from './../../user/services/pokemon-api.service';
import { PokemonComponent } from './../pokemon/pokemon.component';
import { MatDialog} from '@angular/material';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  @Input() pokemons: any = [];

  constructor(private pokemonApi: PokemonApiService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openDialog(id): void {
    this.pokemonApi.cargarId(id);
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '500px',
      height: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
