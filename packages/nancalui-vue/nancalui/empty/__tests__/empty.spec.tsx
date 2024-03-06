import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Empty } from '..';

describe('empty', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('empty init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <Empty />;
        };
      },
    });

    // todo
  })
})
