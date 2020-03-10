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
    this.nests.push(nest);
  }


  public edit(key,nest){
    
  }

  public removeAll(){
    this.nests.remove()
  }

  public deleteNest(key){
    this.nests.remove(key)
  }





}
