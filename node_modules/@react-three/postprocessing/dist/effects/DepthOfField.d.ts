/// <reference types="react" />
import { DepthOfFieldEffect } from 'postprocessing';
import { ReactThreeFiber } from '@react-three/fiber';
import { type Texture, Vector3 } from 'three';
export declare const DepthOfField: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    worldFocusDistance?: number | undefined;
    worldFocusRange?: number | undefined;
    focusDistance?: number | undefined;
    focalLength?: number | undefined;
    focusRange?: number | undefined;
    bokehScale?: number | undefined;
    resolutionScale?: number | undefined;
    resolutionX?: number | undefined;
    resolutionY?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
} & Partial<{
    target: ReactThreeFiber.Vector3;
    depthTexture: {
        texture: Texture;
        packing: number;
    };
    blur: number;
}> & import("react").RefAttributes<DepthOfFieldEffect>>;
