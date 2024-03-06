import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Calendar } from '..';

describe('calendar', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('calendar init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <Calendar />;
        };
      },
    });

    // todo
  })
})
