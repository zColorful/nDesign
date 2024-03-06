import { defineComponent } from 'vue';
import { sortProps, SortProps } from './sort-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './sort.scss';

export default defineComponent({
  props: sortProps,
  emits: ['sort'],
  setup(props: SortProps, ctx) {
    const directionMap = {
      ASC: 'DESC',
      DESC: '',
      default: 'ASC',
    };
    const changeDirection = () => {
      ctx.emit('sort', directionMap[props.sortDirection || 'default']);
    };
    const ns = useNamespace('table');

    return () => (
      <span onClick={changeDirection} class={ns.e('sort-clickable')}>
        <svg version="1.1" width="16px" height="16px" viewBox="0 0 14.0 14.0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="i0">
              <path d="M1440,0 L1440,900 L0,900 L0,0 L1440,0 Z"></path>
            </clipPath>
          </defs>
          <g transform="translate(-1096.0 -140.0)">
            <g clip-path="url(#i0)">
              <g transform="translate(82.0 58.0)">
                <g transform="translate(20.0 68.0)">
                  <g transform="translate(918.0 10.0)">
                    <g transform="translate(76.0 4.0)">
                      <g transform="translate(3.0 1.3199999999999998)">
                        <path
                          d="M8.2,4.02271571 L4.1,0 L0,4.02271571"
                          stroke={props.sortDirection === 'ASC' ? '#447CFD' : '#999999'}
                          stroke-width="1.1"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"></path>
                      </g>
                      <g transform="translate(3.0 8.572284294285751)">
                        <path
                          d="M8.2,0 L4.1,4.02271571 L0,0"
                          stroke={props.sortDirection === 'DESC' ? '#447CFD' : '#999999'}
                          stroke-width="1.1"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
    );
  },
});
