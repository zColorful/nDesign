import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('input-number');

export function IncIcon(): JSX.Element {
  return (
    <svg class={ns.e('icon-arrow')} version="1.1" viewBox="0 0 10.0 6.0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="i0">
          <path d="M1440,0 L1440,1467 L0,1467 L0,0 L1440,0 Z"></path>
        </clipPath>
        <clipPath id="i1">
          <path d="M8,0 L8.91923904,0.919238806 L4.45961952,5.37885809 L0,0.919238806 L0.919238806,0 L4.45961952,3.54038048 L8,0 Z"></path>
        </clipPath>
      </defs>
      <g transform="translate(-523.0 -430.0)">
        <g clip-path="url(#i0)">
          <g transform="translate(442.0 425.0)">
            <g transform="translate(80.99999973773168 4.999999562886019)">
              <g transform="translate(9.4596248070267 5.459595863058675) rotate(-179.99999499104393)">
                <g clip-path="url(#i1)">
                  <polygon
                    points="-2.84217094e-14,0 8.91923904,0 8.91923904,5.37885809 -2.84217094e-14,5.37885809 -2.84217094e-14,0"
                    stroke="none"
                    fill="currentColor"></polygon>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function DecIcon(): JSX.Element {
  return (
    <svg class={ns.e('icon-arrow')} version="1.1" viewBox="0 0 10.0 6.0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="i0">
          <path d="M1440,0 L1440,1467 L0,1467 L0,0 L1440,0 Z"></path>
        </clipPath>
        <clipPath id="i1">
          <path d="M8,0 L8.91923904,0.919238806 L4.45961952,5.37885809 L0,0.919238806 L0.919238806,0 L4.45961952,3.54038048 L8,0 Z"></path>
        </clipPath>
      </defs>
      <g transform="translate(-523.0 -512.0)">
        <g clip-path="url(#i0)">
          <g transform="translate(442.0 491.0)">
            <g transform="translate(81.0 21.0)">
              <g transform="translate(0.540374755859375 0.5404052734375)">
                <g clip-path="url(#i1)">
                  <polygon points="0,0 8.91923904,0 8.91923904,5.37885809 0,5.37885809 0,0" stroke="none" fill="currentColor"></polygon>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
