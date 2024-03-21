import { OutlineEffect } from 'postprocessing';
import { MutableRefObject } from 'react';
import { Object3D } from 'three';
type ObjectRef = MutableRefObject<Object3D>;
export type OutlineProps = ConstructorParameters<typeof OutlineEffect>[2] & Partial<{
    selection: Object3D | Object3D[] | ObjectRef | ObjectRef[];
    selectionLayer: number;
}>;
export declare const Outline: import("react").ForwardRefExoticComponent<{
    blendFunction?: import("postprocessing").BlendFunction | undefined;
    patternTexture?: import("three").Texture | undefined;
    patternScale?: number | undefined;
    edgeStrength?: number | undefined;
    pulseSpeed?: number | undefined;
    visibleEdgeColor?: number | undefined;
    hiddenEdgeColor?: number | undefined;
    multisampling?: number | undefined;
    resolutionScale?: number | undefined;
    resolutionX?: number | undefined;
    resolutionY?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    kernelSize?: import("postprocessing").KernelSize | undefined;
    blur?: boolean | undefined;
    xRay?: boolean | undefined;
} & Partial<{
    selection: Object3D | Object3D[] | ObjectRef | ObjectRef[];
    selectionLayer: number;
}> & import("react").RefAttributes<OutlineEffect>>;
export {};
