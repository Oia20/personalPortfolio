/// <reference types="react" />
import { HueSaturationEffect } from 'postprocessing';
export declare const HueSaturation: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<HueSaturationEffect>, import("@react-three/fiber").NodeProps<HueSaturationEffect, typeof HueSaturationEffect>>> & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    hue?: number | undefined;
    saturation?: number | undefined;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof HueSaturationEffect>>;
