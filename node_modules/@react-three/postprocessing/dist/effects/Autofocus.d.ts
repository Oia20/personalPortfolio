import * as THREE from 'three';
import React, { RefObject } from 'react';
import { Vector3 } from '@react-three/fiber';
import { DepthOfFieldEffect } from 'postprocessing';
import { DepthOfField } from './DepthOfField';
export type AutofocusProps = React.ComponentProps<typeof DepthOfField> & {
    target?: Vector3;
    /** should the target follow the pointer */
    mouse?: boolean;
    /** size of the debug green point  */
    debug?: number;
    /** manual update */
    manual?: boolean;
    /** approximate time to reach the target */
    smoothTime?: number;
};
export type AutofocusApi = {
    dofRef: RefObject<DepthOfFieldEffect>;
    hitpoint: THREE.Vector3;
    update: (delta: number, updateTarget: boolean) => void;
};
export declare const Autofocus: React.ForwardRefExoticComponent<Omit<AutofocusProps, "ref"> & React.RefAttributes<AutofocusApi>>;
