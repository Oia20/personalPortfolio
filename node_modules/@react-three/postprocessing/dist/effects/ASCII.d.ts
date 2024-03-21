/// <reference types="react" />
import { Effect } from 'postprocessing';
interface IASCIIEffectProps {
    font?: string;
    characters?: string;
    fontSize?: number;
    cellSize?: number;
    color?: string;
    invert?: boolean;
}
declare class ASCIIEffect extends Effect {
    constructor({ font, characters, fontSize, cellSize, color, invert, }?: IASCIIEffectProps);
    /** Draws the characters on a Canvas and returns a texture */
    createCharactersTexture(characters: string, font: string, fontSize: number): THREE.Texture;
}
export declare const ASCII: import("react").ForwardRefExoticComponent<IASCIIEffectProps & import("react").RefAttributes<ASCIIEffect>>;
export {};
