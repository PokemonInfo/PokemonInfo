
export class NestPokemon{
    id:string;
    name:string;
    img:string;
    lat:string;
    lng:string;

    public constructor(){
        this.id   = '';
        this.name = '';
        this.img  = 'assets/images/another/nest-img.png';
        this.lat  = '';
        this.lng  = '';
    }

    public setNest(data){
        this.id   = data.id;
        this.name = data.name;
        this.img  = data.image;
        this.lat  = data.lat;
        this.lng  = data.lng;
    }
}