/* eslint-disable @typescript-eslint/indent */
import { h, isVNode, warn } from 'vue';
import { fromPairs } from 'lodash';
import { hasOwn, isArray, isObject } from '@vue/shared';

export function addUnit(value?: string | number, defaultUnit = 'px'): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  } else {
    return '';
  }
}

export const isFunction = (value: unknown) => {
  return Object.prototype.toString.call(value) === '[object Function]';
};

import type { CSSProperties, Component, Slot } from 'vue';

const sumReducer = (sum: number, num: number) => sum + num;

export const sum = (listLike: number | number[]) => {
  return isArray(listLike) ? listLike.reduce(sumReducer, 0) : listLike;
};

export const tryCall = <T>(fLike: T, params: T extends (...args: infer K) => unknown ? K : any, defaultRet = {}) => {
  return isFunction(fLike) ? fLike(params) : fLike ?? defaultRet;
};

export const enforceUnit = (style: CSSProperties) => {
  (['width', 'maxWidth', 'minWidth', 'height'] as const).forEach((key) => {
    style[key] = addUnit(style[key]);
  });

  return style;
};

export const componentToSlot = <T>(ComponentLike: JSX.Element | ((props: T) => Component<T>) | undefined) =>
  isVNode(ComponentLike) ? (props: T) => h(ComponentLike, props) : (ComponentLike as Slot);

export const epPropKey = '__epPropKey';

export const isEpProp = (val: unknown): val is any => isObject(val) && !!(val as any)[epPropKey];

/**
 * @description Build prop. It can better optimize prop types
 * @description 生成 prop，能更好地优化类型
 * @example
  // limited options
  // the type will be PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // limited options and other types
  // the type will be PropType<'small' | 'large' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
  @link see more: https://github.com/element-plus/element-plus/pull/3341
 */

export const buildProp = <Type = never, Value = never, Validator = never, Default = never, Required = false>(
  prop: any,
  key?: string
): any => {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isEpProp(prop)) {
    return prop as any;
  }

  const { values, required, default: defaultValue, type, validator } = prop;

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false;
          let allowedValues: unknown[] = [];

          if (values) {
            allowedValues = Array.from(values);
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue);
            }
            valid ||= allowedValues.includes(val);
          }
          if (validator) {
            valid ||= validator(val);
          }

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(', ');
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`
            );
          }
          return valid;
        }
      : undefined;

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
  };
  if (hasOwn(prop, 'default')) {
    epProp.default = defaultValue;
  }
  return epProp;
};

export const buildProps = <Props extends Record<string, { [epPropKey]: true } | any>>(
  props: Props
): {
  [K in keyof Props]: any;
} => fromPairs(Object.entries(props).map(([key, option]) => [key, buildProp(option as any, key)])) as any;

export const definePropType = <T>(val: any): any => val;

export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as any;
