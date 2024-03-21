/// <reference types="react" />
import { Vector2 } from 'three';
import { GlitchEffect, GlitchMode } from 'postprocessing';
import { ReactThreeFiber } from '@react-three/fiber';
export type GlitchProps = ConstructorParameters<typeof GlitchEffect>[0] & Partial<{
    mode: GlitchMode;
    active: boolean;
    delay: ReactThreeFiber.Vector2;
    duration: ReactThreeFiber.Vector2;
    chromaticAberrationOffset: ReactThreeFiber.Vector2;
    strength: ReactThreeFiber.Vector2;
}>;
export declare const Glitch: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    chromaticAberrationOffset?: Vector2 | undefined;
    delay?: Vector2 | undefined;
    duration?: Vector2 | undefined;
    strength?: Vector2 | undefined;
    perturbationMap?: import("three").Texture | undefined;
    dtSize?: number | undefined;
    columns?: number | undefined;
    ratio?: number | undefined;
} & Partial<{
    mode: GlitchMode;
    active: boolean;
    delay: ReactThreeFiber.Vector2;
    duration: ReactThreeFiber.Vector2;
    chromaticAberrationOffset: ReactThreeFiber.Vector2;
    strength: ReactThreeFiber.Vector2;
}> & import("react").RefAttributes<GlitchEffect>>;
