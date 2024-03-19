import { Texture } from 'three';
export declare const IsObject: (url: any) => url is Record<string, string>;
export type MappedTextureType<T extends string[] | string | Record<string, string>> = T extends any[] ? Texture[] : T extends Record<string, string> ? {
    [key in keyof T]: Texture;
} : Texture;
export declare function useTexture<Url extends string[] | string | Record<string, string>>(input: Url, onLoad?: (texture: MappedTextureType<Url>) => void): MappedTextureType<Url>;
export declare namespace useTexture {
    var preload: (url: string) => undefined;
    var clear: (input: string | string[]) => void;
}
