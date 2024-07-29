import {Shader} from "./shader";
import {Shaders} from "./shaders";
import {Polygon} from "./polygon";
import {Aquanore} from "./aquanore";
import {Vector2} from "./vector2";
import {Color} from "./color";
import {MathHelper} from "./mathhelper";

export class Renderer {
    private static _shader: Shader;
    private static _shaderPolygon: Shader;
    private static _shaderSprite: Shader;

    public static set shaderPolygon(val: Shader) {
        this._shaderPolygon = val;
    }

    public static set shaderSprite(val: Shader) {
        this._shaderSprite = val;
    }

    private constructor() {
    }

    public static init() {
        this._shader = null;
        this._shaderSprite = Shaders.sprite;
        this._shaderPolygon = Shaders.polygon;

        Aquanore.ctx.useProgram(null);
    }

    public static switchShader(shader: Shader): boolean {
        if (shader == null) {
            return false;
        }

        if (this._shader != null && shader.id == this._shader.id) {
            return false;
        }

        this._shader = shader;
        Aquanore.ctx.useProgram(this._shader.id);

        return true;
    }

    public static drawPolygon(polygon: Polygon, texture: any, pos: Vector2, scale: Vector2, origin: Vector2, offset: Vector2, angle: number, flipHor: boolean, flipVert: boolean, color: Color) {
        this.switchShader(this._shaderPolygon);

        const gl = Aquanore.ctx;
        const cos = Math.cos(MathHelper.radians(angle + 90));
        const sin = Math.sin(MathHelper.radians(angle + 90));

        gl.bindVertexArray(polygon.vao);
        gl.uniform2f(gl.getUniformLocation(this._shader.id, "u_resolution"), window.innerWidth, window.innerHeight);
        gl.uniform2f(gl.getUniformLocation(this._shader.id, "u_rotation"), cos, sin);
        gl.uniform2f(gl.getUniformLocation(this._shader.id, "u_translation"), pos.x, pos.y);
        gl.uniform2f(gl.getUniformLocation(this._shader.id, "u_scale"), scale.x, scale.y);
        gl.uniform2f(gl.getUniformLocation(this._shader.id, "u_origin"), origin.x, origin.y);
        gl.uniform2f(gl.getUniformLocation(this._shader.id, "u_offset"), offset.x, offset.y);
        gl.uniform1i(gl.getUniformLocation(this._shader.id, "u_flip_hor"), flipHor ? 1 : 0);
        gl.uniform1i(gl.getUniformLocation(this._shader.id, "u_flip_vert"), flipVert ? 1 : 0);
        gl.uniform4f(gl.getUniformLocation(this._shader.id, "u_color"), color.r / 255.0, color.g / 255.0, color.b / 255.0, color.a / 255.0);
        gl.uniform1i(gl.getUniformLocation(this._shader.id, "u_texture_active"), texture == null ? 0 : 1);

        gl.drawArrays(gl.TRIANGLES, 0, polygon.vertices.length / 2);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindVertexArray(null);
    }
}