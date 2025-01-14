import {Aquanore} from "./aquanore";

export class Texture {
    private _image: HTMLImageElement | null = null;
    private _id: WebGLTexture | null = null;
    private _onLoad: Function | null = null;

    public get id(): WebGLTexture | null {
        return this._id;
    }

    public get width(): number {
        if (!this._image) {
            return 0;
        }

        return this._image.width;
    }

    public get height(): number {
        if (!this._image) {
            return 0;
        }

        return this._image.height;
    }

    public set onLoad(value: Function) {
        this._onLoad = value;
    }

    public constructor(path: string) {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            this.generateTexture();

            if (this._onLoad) {
                this._onLoad();
            }
        };

        this._image = img;
    }

    private generateTexture() {
        const ctx = Aquanore.ctx!;
        const texture = ctx.createTexture();

        ctx.bindTexture(ctx.TEXTURE_2D, texture);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
        ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, this._image!);

        this._id = texture;
    }
}