import { Loader } from "@googlemaps/js-api-loader"
import { InputManager } from "./inputManager"
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
            lat: 39.1673,   // Madrid  40.4168, 
            lng: -3.8532    // Madrid   -3.7038
        },
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
        restriction: {
            latLngBounds: {
                north: 40.6,   // un poco al norte de Madrid
                south: 38.8,   // al sur de Malagón
                east: -3.0,    // al este de Madrid
                west: -4.5     // al oeste de Malagón
            }
        }
    }

    public apiOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
    }

    public apiLoader!: Loader
    public map!: google.maps.Map
    public mapDiv: HTMLDivElement = document.getElementById("map") as HTMLDivElement
    public step: number = 0.00001
    public angularSpeed: number = 1.1

    constructor(private readonly inputManager: InputManager) 
    {
        // Initialization code here
    }
    public async Start(): Promise<void>
    {
       this.apiLoader = new Loader(this.apiOptions)
       await this.apiLoader.importLibrary("maps")
       this.map = new google.maps.Map(this.mapDiv, this.mapOptions)
    }

    public UpdatePosition(): void
    {

        const headingRad = this.mapOptions.heading * Math.PI / 180;

        if (this.inputManager.keyPressed["ArrowUp"] || this.inputManager.keyPressed["w"] || this.inputManager.keyPressed["W"]) {
            this.mapOptions.center.lat += this.step * Math.cos(headingRad);
            this.mapOptions.center.lng += this.step * Math.sin(headingRad);
        }
        if (this.inputManager.keyPressed["ArrowDown"] || this.inputManager.keyPressed["s"] || this.inputManager.keyPressed["S"]) {
            this.mapOptions.center.lat -= this.step * Math.cos(headingRad);
            this.mapOptions.center.lng -= this.step * Math.sin(headingRad);
        }
        if (this.inputManager.keyPressed["ArrowLeft"] || this.inputManager.keyPressed["a"] || this.inputManager.keyPressed["A"]) {
            this.mapOptions.heading -= this.angularSpeed;
        }
        if (this.inputManager.keyPressed["ArrowRight"] || this.inputManager.keyPressed["d"] || this.inputManager.keyPressed["D"]) {
            this.mapOptions.heading += this.angularSpeed;
        }

        this.mapOptions.heading = this.mapOptions.heading % 360; // Ensure heading stays within 0-360 degrees

        this.map.moveCamera({
            tilt: this.mapOptions.tilt,
            heading: this.mapOptions.heading,
            zoom: this.mapOptions.zoom,
            center: this.mapOptions.center
        });
    }
}