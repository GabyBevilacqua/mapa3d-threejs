import { injectable, singleton } from "tsyringe";
import { MapManager } from "./mapManager";
import { SceneManager } from "./sceneManager";
import { RenderManager3D } from "./renderManager3D";
import { Matrix4 } from "three";


@singleton()
@injectable()
/**
 * WebGLOverlayManager is responsible for managing the WebGLOverlayView in Google Maps.
 * It allows custom rendering on top of the map using WebGL.
 */
export class WebGlOverlayManager 
{
    public webGlOverlayView!: google.maps.WebGLOverlayView;

    constructor(
        private readonly renderManager3D: RenderManager3D,
        private readonly sceneManager: SceneManager,
        private readonly mapManager: MapManager,
    ) {}

    public Start(): void
    {
        this.webGlOverlayView = new google.maps.WebGLOverlayView();
        this.webGlOverlayView.setMap(this.mapManager.map);
        this.webGlOverlayView.onAdd = () => this.sceneManager.Start();
        this.webGlOverlayView.onContextRestored = ({ gl }) => this.renderManager3D.ContextRestore(gl);
        this.webGlOverlayView.onDraw = ({ transformer }) => this.Update(transformer);

    }

    private Update(transformer: google.maps.CoordinateTransformer): void
    {
        this.mapManager.UpdatePosition();
        this.UpdateSceneCamera(transformer);
        this.webGlOverlayView.requestRedraw();
        this.renderManager3D.renderer.render(this.sceneManager.scene, this.sceneManager.camera);
        this.renderManager3D.renderer.resetState();
    }

    private UpdateSceneCamera(transformer: google.maps.CoordinateTransformer): void
    {
        this.sceneManager.camera.rotation.z = this.mapManager.mapOptions.heading * Math.PI / 180;

        const latLngAltitudeLiteral = {
            lat: this.mapManager.mapOptions.center.lat,
            lng: this.mapManager.mapOptions.center.lng,
            altitude: 100
        }

        const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);

        this.sceneManager.camera.projectionMatrix = new Matrix4().fromArray(matrix);
    }
}