import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import NSlider from '../src/slider';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('slider', true);

describe('n-slider', () => {
  it('slider v-model work', async () => {
    const value = ref(12);
    const wrapper = mount({
      setup() {
        return () => <NSlider v-model={value.value} min={0} max={20}></NSlider>;
      },
    });

    const bar = wrapper.find(ns.e('bar'));
    expect(bar.attributes('style')).toContain('60%');
    wrapper.unmount();
  });

  it('slider disabled work', () => {
    const wrapper = mount({
      setup() {
        return () => <NSlider disabled></NSlider>;
      },
    });
    const slider = wrapper.find(ns.e('runway'));
    expect(slider.classes()).toContain('disabled');
    wrapper.unmount();
  });

  it('slider tipsRenderer work', async () => {
    const value = ref(5);
    const tips = (val: number) => `${val} apples`;
    const wrapper = mount({
      setup() {
        return () => <NSlider v-model={value.value} tipsRenderer={tips}></NSlider>;
      },
    });
    wrapper.find(ns.e('button')).trigger('mouseenter');
    await nextTick();
    const popover = wrapper.find(ns.e('popover'));
    expect(popover.exists()).toBeTruthy();
    const popoverContent = wrapper.find(ns.e('popover-content'));
    expect(popoverContent.text()).toBe('5 apples');
    wrapper.unmount();
  });

  it.todo('props step work well.');
});
