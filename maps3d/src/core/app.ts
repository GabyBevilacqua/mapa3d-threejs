import { container, singleton, injectable } from "tsyringe";
import { MapManager } from "./mapManager";
import type { InputManager } from "./inputManager";

@singleton()
@injectable()

class App
{

  constructor(
    private readonly mapManager: MapManager,
   // private readonly inputManager: InputManager     da error
  ) { }

  public async Start(): Promise<void>
  {
    // this.inputManager.Start();    da error
    await this.mapManager.Start();
  } 

}

export function startApp(): void
{
  const app: App = container.resolve(App);
  app.Start()
}