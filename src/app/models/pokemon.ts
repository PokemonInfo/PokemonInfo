import { Type } from '../models/type';
import { PokemonApiService } from '../user/services/pokemon-api.service';

export class Pokemon{
    id: string;
    name: string;
    image_default: string;
    image_shiny: string;
    type: Type;
    evolutions: [];

    constructor(id,pokemon_info, private pokemonApi:PokemonApiService){
        this.id = id;
        this.setName(pokemon_info);
        this.setTypes(pokemon_info);
        this.setImageDefault(pokemon_info);
        this.setImageShiny(pokemon_info);
        this.setEvolutions(pokemon_info);
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
    
     
  }