import { Type } from '../models/type';
import { PokemonApiService } from '../user/services/pokemon-api.service';
import  * as formulas  from '../external/formulas'

export class Pokemon{
    id: string;
    name: string;
    image_default: string;
    image_shiny: string;
    type: Type;
    evolutions: [];
    maxPc?:number;
    base_atk?:number;
    base_special_atk?:number;
    base_def?:number;
    base_special_def?:number;
    base_sta?:number;
    base_speed?:number;
    atk?:number;
    def?:number;
    sta?:number;

    constructor(id,pokemon_info, private pokemonApi:PokemonApiService){
        this.id = id;
        this.setName(pokemon_info);
        this.setTypes(pokemon_info);
        this.setImageDefault(pokemon_info);
        this.setImageShiny(pokemon_info);
        this.setEvolutions(pokemon_info);
        this.setBaseStates( 
          pokemon_info.stats[5].base_stat, //hp o sta 
          pokemon_info.stats[4].base_stat, //atack
          pokemon_info.stats[3].base_stat, //def
          pokemon_info.stats[2].base_stat, //sAtk
          pokemon_info.stats[1].base_stat, //sDef
          pokemon_info.stats[0].base_stat  //speed
          )
        this.setStatesGame()
    }

    private setBaseStates(sta,atk,def,sAtk,sDef,speed){
      this.base_atk = atk;
      this.base_def = def;
      this.base_special_atk = sAtk;
      this.base_special_def = sDef;
      this.base_sta = sta;
      this.base_speed = speed
    };

    private setStatesGame(){
      this.sta = formulas.calculateHp(this.base_sta);
      this.atk = formulas.CalculateAtk(this.base_atk,this.base_special_atk,this.base_speed);
      this.def = formulas.CalculateDef(this.base_def,this.base_special_def,this.base_speed);
      this.maxPc = this.calculateMaxPC()
    }

    private calculateMaxPC(){
      let maxPc = formulas.CalculateCombatPower(this,40,{atk: 15, def: 15, sta: 15})
      if(maxPc > 4000){
        this.atk = formulas.NerfState(this.atk);
        this.def = formulas.NerfState(this.def);
        this.sta = formulas.NerfState(this.sta);
        maxPc = formulas.CalculateCombatPower(this,40,{atk: 15, def: 15, sta: 15})
      }
      return maxPc
    }

    
    public setEvolutions(pokemon_info){
      this.pokemonApi.getUrl(pokemon_info['species']['url']).subscribe(
        data =>{
          pokemon_info['extras'] = data;
        },
        err => {},
        () =>{
          this.pokemonApi.getUrl(pokemon_info['extras']['evolution_chain']['url']).subscribe(
            data => {
              data = data['chain']
              pokemon_info['evolution_chain'] = [data['species']];
              let evolution = data['evolves_to'][0];
              if (evolution === undefined){
                console.log("no tiene Evoluciones")
              }else{
                while(evolution !== undefined){
                  pokemon_info['evolution_chain'].push(evolution['species']);
                  evolution = evolution['evolves_to'][0];
                }
                pokemon_info['evolution_chain'].forEach(pokemon => {
                  this.pokemonApi.getUrl(pokemon['url']).subscribe(
                    data => {
                      pokemon['id']  = data['id']
                      pokemon['img'] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokemon['id']+".png"
                    }
                  )
                })
              }
            },
            err => {},
            () => {
              this.evolutions = pokemon_info['evolution_chain'];
            }
          )
        }
      )
    }

    private setName(pokemon_info){
      this.name = pokemon_info['name'];
    }
        
    private setTypes(pokemon_info){
      this.type = new Type(pokemon_info);
    }

    private setImageDefault(pokemon_info){
      this.image_default = (pokemon_info['sprites']['front_default']);
    }

    private setImageShiny(pokemon_info){
      this.image_shiny = (pokemon_info['sprites']['front_shiny']);
    }

    public getMaxPC(){
      return this.maxPc;
    }
    
     
  }