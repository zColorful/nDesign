import type { PropType, ExtractPropTypes } from 'vue';

export const emptyProps = {
  /**
   * @description image URL of empty
   */
  image: {
    type: String,
    default: '',
  },
  /**
   * @description image size (width) of empty
   */
  imageSize: Number,
  /**
   * @description description of empty
   */
  description: {
    type: String,
    default: '',
  },
} as const;

export type EmptyProps = ExtractPropTypes<typeof emptyProps>;
