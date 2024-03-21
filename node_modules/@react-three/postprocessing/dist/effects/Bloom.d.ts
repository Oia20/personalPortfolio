/// <reference types="react" />
import { BloomEffect, BlendFunction } from 'postprocessing';
export declare const Bloom: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<BloomEffect>, import("@react-three/fiber").NodeProps<BloomEffect, typeof BloomEffect>>> & import("postprocessing").BloomEffectOptions & {
    blendFunction?: BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof BloomEffect>>;
