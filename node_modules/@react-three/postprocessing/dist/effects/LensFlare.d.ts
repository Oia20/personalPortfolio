/// <reference types="react" />
import * as THREE from 'three';
import { BlendFunction, Effect } from 'postprocessing';
export declare class LensFlareEffect extends Effect {
    constructor({ blendFunction, enabled, glareSize, lensPosition, iResolution, starPoints, flareSize, flareSpeed, flareShape, animated, anamorphic, colorGain, lensDirtTexture, haloScale, secondaryGhosts, aditionalStreaks, ghostScale, opacity, starBurst, }?: {
        blendFunction?: BlendFunction | undefined;
        enabled?: boolean | undefined;
        glareSize?: number | undefined;
        lensPosition?: number[] | undefined;
        iResolution?: number[] | undefined;
        starPoints?: number | undefined;
        flareSize?: number | undefined;
        flareSpeed?: number | undefined;
        flareShape?: number | undefined;
        animated?: boolean | undefined;
        anamorphic?: boolean | undefined;
        colorGain?: THREE.Color | undefined;
        lensDirtTexture?: THREE.Texture | null | undefined;
        haloScale?: number | undefined;
        secondaryGhosts?: boolean | undefined;
        aditionalStreaks?: boolean | undefined;
        ghostScale?: number | undefined;
        opacity?: number | undefined;
        starBurst?: boolean | undefined;
    });
    update(_renderer: any, _inputBuffer: any, deltaTime: number): void;
}
export declare const LensFlare: import("react").ForwardRefExoticComponent<{
    blendFunction?: BlendFunction | undefined;
    enabled?: boolean | undefined;
    glareSize?: number | undefined;
    lensPosition?: number[] | undefined;
    iResolution?: number[] | undefined;
    starPoints?: number | undefined;
    flareSize?: number | undefined;
    flareSpeed?: number | undefined;
    flareShape?: number | undefined;
    animated?: boolean | undefined;
    anamorphic?: boolean | undefined;
    colorGain?: THREE.Color | undefined;
    lensDirtTexture?: THREE.Texture | null | undefined;
    haloScale?: number | undefined;
    secondaryGhosts?: boolean | undefined;
    aditionalStreaks?: boolean | undefined;
    ghostScale?: number | undefined;
    opacity?: number | undefined;
    starBurst?: boolean | undefined;
} & {
    position?: THREE.Vector3 | undefined;
    followMouse?: boolean | undefined;
    smoothTime?: number | undefined;
} & import("react").RefAttributes<LensFlareEffect>>;
