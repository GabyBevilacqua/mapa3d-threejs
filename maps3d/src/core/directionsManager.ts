import { injectable, singleton } from "tsyringe";
import { MapManager } from "./mapManager";


@singleton()
@injectable()

/**
 * DirectionsManager is responsible for managing directions in Google Maps.
 * It uses the DirectionsService and DirectionsRenderer to display routes.
 * 
 * CUIDADO ESTE SERVICIO COBRA POR USO!!!!
 * @description: This service calculates and renders directions on the map.
 * @param mapManager - The MapManager instance to access the map.
 * @method Start - Initializes the DirectionsService and DirectionsRenderer.
 * 
 */
export class DirectionsManager 
{
    public directionsService!: google.maps.DirectionsService;
    public directionsRenderer!: google.maps.DirectionsRenderer;
    public routeParams!: google.maps.DirectionsRequest;

    constructor(private readonly mapManager: MapManager) 
    { }

    public Start(): void 
    {
        this.routeParams ={
            origin: { lat: 40.4168, lng: -3.7038 }, // Madrid centro
            destination: { lat: 40.415363, lng: -3.684150 }, // Parque del Retiro, Madrid
            travelMode: google.maps.TravelMode.WALKING, // Default travel mode
        }
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({ preserveViewport: true });
        this.directionsRenderer.setMap(this.mapManager.map);
        setInterval(() => this.UpdateRoute(), 5000); // Update route every 5 seconds
    }

    public CalcRoute(): void
    {
        this.directionsService.route(this.routeParams, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionsRenderer.setDirections(result);
            } else {
                console.error(`Directions request failed due to ${status}`);
            }
        });
    }

    public UpdateRoute (): void
    {
        this.routeParams = {
            origin: this.mapManager.mapOptions.center,
            destination: { lat: 40.415363, lng: -3.684150 }, // Parque del Retiro, Madrid
            travelMode: google.maps.TravelMode.WALKING, // Example travel mode
        }
        this.CalcRoute();
    }
}