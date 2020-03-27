export interface Feature {
    feature: 
        {type: 'Feature',
        properties: {
        name: string,
        image: string,
        iconSize: [number, number]
        },
        geometry: {
        type: 'Point',
        coordinates: [string, string]
        }
    }
}