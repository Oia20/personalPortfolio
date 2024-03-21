/// <reference types="react" />
import { ReactThreeFiber } from '@react-three/fiber';
type N8AOProps = {
    aoRadius?: number;
    distanceFalloff?: number;
    intensity?: number;
    quality?: 'performance' | 'low' | 'medium' | 'high' | 'ultra';
    aoSamples?: number;
    denoiseSamples?: number;
    denoiseRadius?: number;
    color?: ReactThreeFiber.Color;
    halfRes?: boolean;
    depthAwareUpsampling?: boolean;
    screenSpaceRadius?: boolean;
    renderMode?: 0 | 1 | 2 | 3 | 4;
};
export declare const N8AO: import("react").ForwardRefExoticComponent<N8AOProps & import("react").RefAttributes<N8AOPostPass>>;
export {};
