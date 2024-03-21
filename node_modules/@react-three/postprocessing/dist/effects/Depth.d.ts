/// <reference types="react" />
import { DepthEffect } from 'postprocessing';
export declare const Depth: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<DepthEffect>, import("@react-three/fiber").NodeProps<DepthEffect, typeof DepthEffect>>> & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    inverted?: boolean | undefined;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof DepthEffect>>;
