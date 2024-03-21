/// <reference types="react" />
import { SMAAEffect } from 'postprocessing';
export declare const SMAA: import("react").ForwardRefExoticComponent<Omit<import("@react-three/fiber").ExtendedColors<import("@react-three/fiber").Overwrite<Partial<SMAAEffect>, import("@react-three/fiber").NodeProps<SMAAEffect, typeof SMAAEffect>>> & {
    preset?: import("postprocessing").SMAAPreset | undefined;
    edgeDetectionMode?: import("postprocessing").EdgeDetectionMode | undefined;
    predicationMode?: import("postprocessing").PredicationMode | undefined;
} & {
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    opacity?: number | undefined;
}, "ref"> & import("react").RefAttributes<typeof SMAAEffect>>;
