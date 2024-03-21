import { SelectiveBloomEffect } from 'postprocessing';
import type { BloomEffectOptions } from 'postprocessing';
import React, { MutableRefObject } from 'react';
import { Object3D } from 'three';
type ObjectRef = MutableRefObject<Object3D>;
export type SelectiveBloomProps = BloomEffectOptions & Partial<{
    lights: Object3D[] | ObjectRef[];
    selection: Object3D | Object3D[] | ObjectRef | ObjectRef[];
    selectionLayer: number;
}>;
export declare const SelectiveBloom: React.ForwardRefExoticComponent<BloomEffectOptions & Partial<{
    lights: Object3D[] | ObjectRef[];
    selection: Object3D | Object3D[] | ObjectRef | ObjectRef[];
    selectionLayer: number;
}> & React.RefAttributes<SelectiveBloomEffect>>;
export {};
