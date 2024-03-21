/// <reference types="react" />
import { BlendFunction, Effect } from 'postprocessing';
export declare class TiltShiftEffect extends Effect {
    constructor({ blendFunction, blur, // [0, 1], can go beyond 1 for extra
    taper, // [0, 1], can go beyond 1 for extra
    start, // [0,1] percentage x,y of screenspace
    end, // [0,1] percentage x,y of screenspace
    samples, // number of blur samples
    direction, }?: {
        blendFunction?: BlendFunction | undefined;
        blur?: number | undefined;
        taper?: number | undefined;
        start?: number[] | undefined;
        end?: number[] | undefined;
        samples?: number | undefined;
        direction?: number[] | undefined;
    });
}
export declare const TiltShift2: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<TiltShiftEffect>, import("@react-three/fiber").NodeProps<TiltShiftEffect, typeof TiltShiftEffect>>> & {
    blendFunction?: BlendFunction | undefined;
    blur?: number | undefined;
    taper?: number | undefined;
    start?: number[] | undefined;
    end?: number[] | undefined;
    samples?: number | undefined;
    direction?: number[] | undefined;
} & {
    blendFunction?: BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof TiltShiftEffect>>;
