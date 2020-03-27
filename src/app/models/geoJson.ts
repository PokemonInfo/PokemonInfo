import { NestPokemon } from './nest';
import { Feature } from '../user/interfaces';

export class GeoJson{
    type: string;
    features = {'type': 'FeatureCollection',
                'features': []};

    private constructor(){
    }

    public static getGeoJsonNest(type:string, nests:Array<NestPokemon>){
        let geoJson = new GeoJson();
        geoJson.type = type;
        geoJson.loadFeatures(nests);
        return (geoJson.features)
    }

    private loadFeatures(nests:Array<NestPokemon>){
        let feature;
        let array_features = [];
        nests.forEach(element => {
            feature = {'type': 'Feature',
                'properties': {
                'name': element.name,
                'image': element.img,
                'iconSize': [60, 60]
                },
                'geometry': {
                'type': 'Point',
                'coordinates': [element.lng, element.lat]
                },
            };
            array_features.push(feature);
        });
        this.features.features = array_features;
        this.insertInToMap(this.features);
    }

    private insertInToMap(features){
        console.log(features);

    }

}