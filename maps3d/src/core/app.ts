import { container, singleton, injectable } from "tsyringe";
import { MapManager } from "./mapManager";

@singleton()
@injectable()

class App
{

  constructor(
    private readonly mapManager: MapManager
  ) { }

  public async start(): Promise<void>
  {
    await this.mapManager.Start();
  } 

}

export function startApp(): void
{
  const app: App = container.resolve(App);
  app.start()
}