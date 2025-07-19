import type { Loader } from "@googlemaps/js-api-loader"

export class MapManager 
{

    public mapOptions = {

    }

    public apiOptions = {

    }

    public apiLoader!: Loader
    public map!: google.maps.Map
    public mapDiv: HTMLDivElement = document.getElementById("map") as HTMLDivElement

    constructor() {
        // Initialization code here
    }
    public async Start(): Promise<void>
    {
       
    }
}