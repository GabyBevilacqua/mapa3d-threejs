import { singleton } from "tsyringe";


@singleton()
export class InputManager 
{

    constructor()
    {
        console.log("InputManager initialized");
    }

    public Start(): void
    {
        

    }
}