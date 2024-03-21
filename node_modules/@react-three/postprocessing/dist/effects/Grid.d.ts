import React from 'react';
import { GridEffect } from 'postprocessing';
export declare const Grid: React.ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    scale?: number | undefined;
    lineWidth?: number | undefined;
} & Partial<{
    size: {
        width: number;
        height: number;
    };
}> & React.RefAttributes<GridEffect>>;
