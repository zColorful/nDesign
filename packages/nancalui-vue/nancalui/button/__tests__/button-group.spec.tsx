import { mount } from '@vue/test-utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Button, ButtonGroup } from '../index';

const ns = useNamespace('button', true);

const baseClass = ns.b();
const mdClass = ns.m('md');

describe('button group', () => {
  describe('button group basic', () => {
    const TestComponent = {
      components: {
        'n-button': Button,
        'n-button-group': ButtonGroup,
      },
      template: `
        <n-button-group>
        <n-button disabled>上海</n-button>
        <n-button color='primary' variant='solid'>北京</n-button>
        <n-button disabled>深圳</n-button>
        </n-button-group>
      `,
    };
    const wrapper = mount(TestComponent);

    it('button group demo has created successfully', async () => {
      expect(wrapper).toBeTruthy();
    });

    it('button group should have content', () => {
      const container = wrapper.find(baseClass);
      expect(container.exists()).toBeTruthy();
    });

    it('size', () => {
      const container = wrapper.find(mdClass);
      expect(container.exists()).toBeTruthy();
    });
  });
});
