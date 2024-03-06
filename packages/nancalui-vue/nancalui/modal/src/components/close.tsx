import { defineComponent } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'NModalClose',
  setup() {
    const ns = useNamespace('modal');

    return () => (
      <div class={ns.e('close')}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="14px" height="14px" viewBox="0 0 14.0 14.0">
          <defs>
            <clipPath id="i0">
              <path d="M1440,0 L1440,3982 L0,3982 L0,0 L1440,0 Z" />
            </clipPath>
            <clipPath id="i1">
              <path d="M14,0 L14,14 L0,14 L0,0 L14,0 Z" />
            </clipPath>
          </defs>
          <g transform="translate(-634.0 -1977.0)">
            <g clip-path="url(#i0)">
              <g transform="translate(118.0 1953.0)">
                <g transform="translate(30.0 20.0)">
                  <g transform="translate(486.0 4.0)">
                    <g clip-path="url(#i1)">
                      <polygon points="0,0 14,0 14,14 0,14 0,0" stroke="none" fill="rgba(255, 255, 255, 0.01)" />
                    </g>
                    <g transform="translate(1.5 1.5)">
                      <path
                        d="M0,0 L11,11"
                        stroke="#999999"
                        stroke-width="1.8"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M0,11 L11,0"
                        stroke="#999999"
                        stroke-width="1.8"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  },
});
