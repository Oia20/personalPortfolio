/// <reference types="react" />
import { BlendFunction, Effect } from 'postprocessing';
export declare class WaterEffectImpl extends Effect {
    constructor({ blendFunction, factor }?: {
        blendFunction?: BlendFunction | undefined;
        factor?: number | undefined;
    });
}
export declare const WaterEffect: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<WaterEffectImpl>, import("@react-three/fiber").NodeProps<WaterEffectImpl, typeof WaterEffectImpl>>> & {
    blendFunction?: BlendFunction | undefined;
    factor?: number | undefined;
} & {
    blendFunction?: BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof WaterEffectImpl>>;
