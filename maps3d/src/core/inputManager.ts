import { singleton } from "tsyringe";


@singleton()
export class InputManager 
{
    public keyPressed: { [key: string]: boolean } = {};

    constructor()
    {
        console.log("InputManager initialized");
    }

    public Start(): void
    {
        this.ConfigInput();

    }

    private ConfigInput(): void
    {
       document.addEventListener('keydown', (e: KeyboardEvent) => {
           this.keyPressed[e.key] = true;
       })
       document.addEventListener('keyup', (e: KeyboardEvent) => {
           this.keyPressed[e.key] = false;
       });
   }
}