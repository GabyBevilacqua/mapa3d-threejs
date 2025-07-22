import { AmbientLight, PerspectiveCamera, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

// This class can be used to manage different scenes in the application
export class SceneManager 
{
    public scene!: Scene
    public camera!: PerspectiveCamera
    public loader!: GLTFLoader

    public Start(): void 
    {
        this.CreateScene();
        this.CreateCamera();
        this.CreateLights();
       // this.LoadModel();
    }

    private CreateScene(): void
    {
        this.scene = new Scene();
    }

    private CreateCamera(): void
    {
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene.add(this.camera);
    }  

    private CreateLights(): void
    {
        const ambientLight = new AmbientLight(0xffffff, 0.75);
        this.scene.add(ambientLight);
    }

    // private LoadModel(): void
    // {
    //     this.loader = new GLTFLoader()
    //     const source = 'pin.gltf'

    //     this.loader.load(
    //         source, 
    //         (gltf) => 
    //         {
    //             gltf.scene.scale.set(25, 25, 25);
    //             gltf.scene.rotation.x = 180 * Math.PI / 180; // Convert degrees to radians
    //             this.scene.add(gltf.scene)
    //         }
    //     )
    //}
}