import { WebGLRenderer } from "three";
import { singleton } from "tsyringe";


@ singleton()
export class RenderManager3D 
{
    public renderer!: WebGLRenderer

    public ContextRestore(gl: WebGLRenderingContext): void
    {
        this.renderer = new WebGLRenderer({
            canvas: gl.canvas,
            context: gl,
            ...gl.getContextAttributes()
        })

        this.renderer.autoClear = false;
    }
}