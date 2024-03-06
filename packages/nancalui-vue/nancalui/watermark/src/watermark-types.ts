import type { PropType, ExtractPropTypes } from 'vue';

export interface FontStyle {
  color?: string;
  fontSize?: number | string;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  fontFamily?: string;
}

export type NumEum2 = [number, number];
export interface Size {
  width?: number | string;
  height?: number | string;
}
export interface WaterMarkerOptions {
  show?: boolean;
  zIndex?: number;
  opacity?: number;
  rotate?: number;
  width?: number;
  height?: number;
  image?: string;
  imageRight?: number; //  图片和文字同时存在时右侧与文字的间距
  content?: string | string[];
  font?: FontStyle;
  gap?: NumEum2;
  imageSize?: Size;
  offset?: NumEum2;
}

export const watermarkProps = {
  show: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 9,
  },
  opacity: {
    type: Number,
    default: 0.5,
  },
  rotate: {
    type: Number,
    default: -22,
  },
  width: {
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  imageSize: {
    type: Object as unknown as PropType<Size>,
    required: false,
  },
  imageRight: {
    type: Number,
    default: 5,
  },
  content: {
    type: [String, Array] as PropType<string | string[]>,
    required: false,
  },
  font: {
    type: Object as PropType<FontStyle>,
    default: () => ({}),
  },
  gap: {
    type: Array as unknown as PropType<NumEum2>,
    default: () => [100, 100],
  },
  offset: {
    type: Array as unknown as PropType<NumEum2>,
    required: false,
  },
} as const;

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>;

export const BaseSize = 2;
export const FontGap = 3;

export interface ReturnSize {
  w: number;
  h: number;
  img?: HTMLImageElement;
  imgWidth: number;
  imgHeight: number;
  right: number;
  contentWidth: number;
  contentHeight: number;
}
