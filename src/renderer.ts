import {Shader} from "./shader";
import {Shaders} from "./shaders";
import {Polygon} from "./polygon";
import {Aquanore} from "./aquanore";
import {Vector2} from "./vector2";
import {Color} from "./color";
import {MathHelper} from "./mathhelper";
import {Texture} from "./texture";
import {Sprite} from "./sprite";
import {BitmapFont} from "./bitmapfont";

export class Renderer {
    private static _shader: Shader | null = null;
    private static _shaderPolygon: Shader | null = null;
    private static _shaderFont: Shader | null = null;
    
    public static set shaderPolygon(value: Shader) {
        this._shaderPolygon = value;
    }
    
    public static set shaderFont(value: Shader) {
        this._shaderFont = value;
    }

    private constructor() {
    }

    public static init() {
        this._shader = null;
        this._shaderPolygon = Shaders.polygon;
        this._shaderFont = Shaders.font;

        Aquanore.ctx!.useProgram(null);
    }

    public static switchShader(shader: Shader): boolean {
        if (shader == null) {
            return false;
        }

        if (this._shader != null && shader.id == this._shader.id) {
            return false;
        }

        this._shader = shader;
        Aquanore.ctx!.useProgram(this._shader.id);

        return true;
    }

    public static drawSprite(sprite: Sprite, pos: Vector2, scale: Vector2, origin: Vector2, frameHor: number, frameVert: number, angle: number, flipHor: boolean, flipVert: boolean, color: Color) {
        const offset = new Vector2(0, 0);
        offset.x = (1.0 / sprite.framesHor) * frameHor;
        offset.y = (1.0 / sprite.framesVert) * frameVert;

        this.drawPolygon(sprite.poly!, sprite.tex!, pos, scale, origin, offset, angle, flipHor, flipVert, color);
    }

    public static drawPolygon(polygon: Polygon, texture: Texture, pos: Vector2, scale: Vector2, origin: Vector2, offset: Vector2, angle: number, flipHor: boolean, flipVert: boolean, color: Color) {
        if (!polygon) {
            return;
        }

        this.switchShader(this._shaderPolygon!);

        const gl = Aquanore.ctx!;
        const cos = Math.cos(MathHelper.radians(angle + 90));
        const sin = Math.sin(MathHelper.radians(angle + 90));

        gl.bindVertexArray(polygon.vao);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_resolution"), window.innerWidth, window.innerHeight);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_rotation"), cos, sin);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_translation"), pos.x, pos.y);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_scale"), scale.x, scale.y);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_origin"), origin.x, origin.y);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_offset"), offset.x, offset.y);
        gl.uniform1i(gl.getUniformLocation(this._shader!.id, "u_flip_hor"), flipHor ? 1 : 0);
        gl.uniform1i(gl.getUniformLocation(this._shader!.id, "u_flip_vert"), flipVert ? 1 : 0);
        gl.uniform4f(gl.getUniformLocation(this._shader!.id, "u_color"), color.r / 255.0, color.g / 255.0, color.b / 255.0, color.a / 255.0);
        gl.uniform1i(gl.getUniformLocation(this._shader!.id, "u_texture_active"), texture == null ? 0 : 1);

        if (texture != null) {
            gl.bindTexture(gl.TEXTURE_2D, texture.id);
            gl.activeTexture(gl.TEXTURE0);
        }

        gl.drawArrays(gl.TRIANGLES, 0, polygon.vertices.length / 2);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindVertexArray(null);
    }

    public static drawText(font: BitmapFont, text: string, pos: Vector2, scale: Vector2, color: Color) {
        if (!font) {
            return;
        }

        this.switchShader(this._shaderFont!);

        const gl = Aquanore.ctx!;
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_resolution"), window.innerWidth, window.innerHeight);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_rotation"), 0, 1);
        gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_scale"), scale.x, scale.y);
        gl.uniform4f(gl.getUniformLocation(this._shader!.id, "u_color"), color.r / 255.0, color.g / 255.0, color.b / 255.0, color.a / 255.0);
        gl.bindTexture(gl.TEXTURE_2D, font.tex!.id);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindVertexArray(font.vao);

        let advance = 0;

        for (let c of text) {
            const index = c.charCodeAt(0);
            const glyph = font.glyphs[index];

            if (!glyph) {
                continue;
            }

            let textX = pos.x + glyph.xoffset * scale.x + advance;
            let textY = pos.y + glyph.yoffset * scale.y;

            gl.uniform2f(gl.getUniformLocation(this._shader!.id, "u_translation"), textX, textY);
            gl.drawArrays(gl.TRIANGLES, index * 6, 6);

            advance += glyph.xadvance * scale.x;
        }

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindVertexArray(null);
    }
}
