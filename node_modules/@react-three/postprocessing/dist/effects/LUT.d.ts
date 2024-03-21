import { LUT3DEffect, BlendFunction } from 'postprocessing';
import React from 'react';
import type { Texture } from 'three';
export type LUTProps = {
    lut: Texture;
    blendFunction?: BlendFunction;
    tetrahedralInterpolation?: boolean;
};
export declare const LUT: React.ForwardRefExoticComponent<LUTProps & React.RefAttributes<LUT3DEffect>>;
