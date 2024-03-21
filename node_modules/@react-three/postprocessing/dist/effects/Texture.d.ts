/// <reference types="react" />
import { TextureEffect } from 'postprocessing';
export declare const Texture: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    texture?: import("three").Texture | undefined;
    aspectCorrection?: boolean | undefined;
} & {
    textureSrc: string;
} & import("react").RefAttributes<TextureEffect>>;
