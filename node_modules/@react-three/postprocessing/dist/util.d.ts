import React, { MutableRefObject } from 'react';
import { Vector2 } from 'three';
import * as THREE from 'three';
import { type ReactThreeFiber } from '@react-three/fiber';
import type { Effect, BlendFunction } from 'postprocessing';
export declare const resolveRef: <T>(ref: T | React.MutableRefObject<T>) => T;
export type EffectConstructor = new (...args: any[]) => Effect;
export type EffectProps<T extends EffectConstructor> = ReactThreeFiber.Node<T extends Function ? T['prototype'] : InstanceType<T>, T> & ConstructorParameters<T>[0] & {
    blendFunction?: BlendFunction;
    opacity?: number;
};
export declare const wrapEffect: <T extends EffectConstructor>(effect: T, defaults?: EffectProps<T> | undefined) => React.ForwardRefExoticComponent<React.PropsWithoutRef<EffectProps<T>> & React.RefAttributes<T>>;
export declare const useVector2: (props: Record<string, unknown>, key: string) => THREE.Vector2;
