/// <reference types="react" />
import { ScanlineEffect, BlendFunction } from 'postprocessing';
export declare const Scanline: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<ScanlineEffect>, import("@react-three/fiber").NodeProps<ScanlineEffect, typeof ScanlineEffect>>> & {
    blendFunction?: BlendFunction | undefined;
    density?: number | undefined;
} & {
    blendFunction?: BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof ScanlineEffect>>;
