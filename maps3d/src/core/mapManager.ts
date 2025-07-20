import { Loader } from "@googlemaps/js-api-loader"
import type { InputManager } from "./inputManager"
import { injectable, singleton } from "tsyringe"

@singleton()
@injectable()

export class MapManager 
{

    public mapOptions = {
        tilt: 67,
        heading: 0,
        zoom: 17,
        center: {
            lat: 40.4168,
            lng: -3.7038
        },
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID
    }

    public apiOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
    }

    public apiLoader!: Loader
    public map!: google.maps.Map
    public mapDiv: HTMLDivElement = document.getElementById("map") as HTMLDivElement

    constructor() //private readonly inputManager: InputManager  pongo esto da error
    {
        // Initialization code here
    }
    public async Start(): Promise<void>
    {
       this.apiLoader = new Loader(this.apiOptions)
       await this.apiLoader.importLibrary("maps")
         this.map = new google.maps.Map(this.mapDiv, this.mapOptions)
    }
}