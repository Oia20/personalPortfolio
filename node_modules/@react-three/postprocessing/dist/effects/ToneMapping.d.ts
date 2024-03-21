/// <reference types="react" />
import { ToneMappingEffect } from 'postprocessing';
import { EffectProps } from '../util';
export type ToneMappingProps = EffectProps<typeof ToneMappingEffect>;
export declare const ToneMapping: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<ToneMappingEffect>, import("@react-three/fiber").NodeProps<ToneMappingEffect, typeof ToneMappingEffect>>> & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    adaptive?: boolean | undefined;
    mode?: import("postprocessing").ToneMappingMode | undefined;
    resolution?: number | undefined;
    maxLuminance?: number | undefined;
    whitePoint?: number | undefined;
    middleGrey?: number | undefined;
    minLuminance?: number | undefined;
    averageLuminance?: number | undefined;
    adaptationRate?: number | undefined;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<ToneMappingEffect>>;
