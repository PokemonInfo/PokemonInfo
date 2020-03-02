import { Injectable } from '@angular/core';

import { AngularFireDatabase , AngularFireList  } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class NestService {

  nests: AngularFireList<any>;

  constructor(private db:AngularFireDatabase) { }

  public getNests<AngularFireList>(){
    return this.nests = this.db.list('/pokemons');
  }

  public addNest(nest){
    this.nests.push({
      "id": nest.id,
      "lat": nest.lat,
      "lng": nest.lng,
    });
  }

  public updateNest(nest){
    this.nests.update(nest.id,{
      "id": nest.id,
      "lat": nest.lat,
      "lng": nest.lng,
    })
  }

  public deleteNest(id){
    this.nests.remove(id)
  }





}
