/// <reference types="react" />
import { TiltShiftEffect, BlendFunction } from 'postprocessing';
export declare const TiltShift: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<TiltShiftEffect>, import("@react-three/fiber").NodeProps<TiltShiftEffect, typeof TiltShiftEffect>>> & {
    blendFunction?: BlendFunction | undefined;
    offset?: number | undefined;
    rotation?: number | undefined;
    focusArea?: number | undefined;
    feather?: number | undefined;
    bias?: number | undefined;
    kernelSize?: import("postprocessing").KernelSize | undefined;
    resolutionScale?: number | undefined;
    resolutionX?: number | undefined;
    resolutionY?: number | undefined;
} & {
    blendFunction?: BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof TiltShiftEffect>>;
