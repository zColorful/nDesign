import { computed, defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import type { CSSProperties } from 'vue';

import { buildProps, definePropType } from '../../table-v/src/utils';
import './divider.scss';

type BorderStyle = CSSStyleDeclaration['borderStyle'];

const dividerProps = buildProps({
  /**
   * @description Set divider's direction
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * @description Set the distance of divider's text away from two sides
   */
  distance: {
    type: Number || String,
    default: 20,
  },
  /**
   * @description Set the style of divider
   */
  contentPosition: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'center',
  },
  /**
   * @description the position of the customized content on the divider line
   */
  borderStyle: {
    type: definePropType<BorderStyle>(String),
    default: 'solid',
  },
} as const);

export default defineComponent({
  name: 'NDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const ns = useNamespace('divider');
    const dividerStyle: any = ns.cssVar({
      'border-top-style': props.borderStyle,
    });
    let textStyle;
    if (props.contentPosition !== 'center') {
      textStyle = {
        [props.contentPosition]: typeof props.distance === 'number' ? `${props.distance}px` : props.distance,
      };
    } else {
      textStyle = null;
    }

    return () => {
      return (
        <div class={[ns.b(), ns.m(props.direction)]} style={dividerStyle} role="separator">
          {slots.default && props.direction !== 'vertical' && (
            <div class={[ns.e('text'), ns.is(props.contentPosition)]} style={textStyle}>
              {slots.default()}
            </div>
          )}
        </div>
      );
    };
  },
});
