import { container, singleton, injectable } from "tsyringe";
import { MapManager } from "./mapManager";
import { InputManager } from "./inputManager";
import { WebGlOverlayManager } from "./webgLoverlayManager";
import { DirectionsManager } from "./directionsManager";

@singleton()
@injectable()

class App
{

  constructor(
    private readonly directionsManager: DirectionsManager,
    private readonly mapManager: MapManager,
    private readonly inputManager: InputManager, 
    private readonly webGlOverlayManager: WebGlOverlayManager,
  ) { }

  public async Start(): Promise<void>
  {
    this.inputManager.Start()  
    await this.mapManager.Start()
    this.directionsManager.Start();
    this.webGlOverlayManager.Start();
  } 

}

export function startApp(): void
{
  const app: App = container.resolve(App);
  app.Start()
}