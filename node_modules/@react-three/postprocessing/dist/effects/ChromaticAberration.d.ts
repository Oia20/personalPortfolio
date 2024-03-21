/// <reference types="react" />
import { ChromaticAberrationEffect } from 'postprocessing';
import { type EffectProps } from '../util';
export type ChromaticAberrationProps = EffectProps<typeof ChromaticAberrationEffect>;
export declare const ChromaticAberration: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<ChromaticAberrationEffect>, import("@react-three/fiber").NodeProps<ChromaticAberrationEffect, typeof ChromaticAberrationEffect>>> & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    offset?: import("three").Vector2 | undefined;
    radialModulation: boolean;
    modulationOffset: number;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof ChromaticAberrationEffect>>;
