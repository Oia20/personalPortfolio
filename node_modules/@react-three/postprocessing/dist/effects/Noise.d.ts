/// <reference types="react" />
import { NoiseEffect, BlendFunction } from 'postprocessing';
export declare const Noise: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<NoiseEffect>, import("@react-three/fiber").NodeProps<NoiseEffect, typeof NoiseEffect>>> & {
    blendFunction?: BlendFunction | undefined;
    premultiply?: boolean | undefined;
} & {
    blendFunction?: BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof NoiseEffect>>;
