import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Watermark } from '..';

describe('watermark', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('watermark init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <Watermark />;
        };
      },
    });

    // todo
  });
});
