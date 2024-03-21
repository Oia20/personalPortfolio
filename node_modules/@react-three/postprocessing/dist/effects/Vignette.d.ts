/// <reference types="react" />
import { VignetteEffect } from 'postprocessing';
export declare const Vignette: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<VignetteEffect>, import("@react-three/fiber").NodeProps<VignetteEffect, typeof VignetteEffect>>> & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    technique?: import("postprocessing").VignetteTechnique | undefined;
    eskil?: boolean | undefined;
    offset?: number | undefined;
    darkness?: number | undefined;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof VignetteEffect>>;
