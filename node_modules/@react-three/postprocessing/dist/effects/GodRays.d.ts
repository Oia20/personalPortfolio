import { GodRaysEffect } from 'postprocessing';
import React from 'react';
import { Mesh, Points } from 'three';
export declare const GodRays: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    samples?: number | undefined;
    density?: number | undefined;
    decay?: number | undefined;
    weight?: number | undefined;
    exposure?: number | undefined;
    clampMax?: number | undefined;
    resolutionScale?: number | undefined;
    resolutionX?: number | undefined;
    resolutionY?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    kernelSize?: import("postprocessing").KernelSize | undefined;
    blur?: boolean | undefined;
} & {
    sun: Mesh | Points | React.MutableRefObject<Mesh | Points>;
} & React.RefAttributes<GodRaysEffect>>;
