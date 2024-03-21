/// <reference types="react" />
import { SepiaEffect } from 'postprocessing';
export declare const Sepia: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<SepiaEffect>, import("@react-three/fiber").NodeProps<SepiaEffect, typeof SepiaEffect>>> & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    intensity?: number | undefined;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof SepiaEffect>>;
