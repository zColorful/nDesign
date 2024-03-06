import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { Row, Col } from '../index';
import { Justify, Align, ColProps } from '../src/grid-types';
import { screenMedias } from '../src/composables/use-screen';

describe('n-row', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });

  it('n-row init', () => {
    const wrapper = mount(Row);
    expect(wrapper.classes()).toEqual(['nancalui-row', 'nancalui-row__align--top', 'nancalui-row__justify--start']);
  });

  const justify: Justify[] = ['start', 'end', 'center', 'around', 'between'];
  justify.forEach((item) => {
    it(`n-row justify ${item}`, () => {
      const wrapper = mount(Row, {
        props: { justify: item },
      });
      expect(wrapper.classes(`nancalui-row__justify--${item}`)).toBe(true);
    });
  });

  const align: Align[] = ['top', 'middle', 'bottom'];
  align.forEach((item) => {
    it(`n-row align ${item}`, () => {
      const wrapper = mount(Row, {
        props: { align: item },
      });
      expect(wrapper.classes(`nancalui-row__align--${item}`)).toBe(true);
    });
  });

  it('n-row wrap', () => {
    const wrapper = mount(Row, {
      props: { wrap: true },
    });
    expect(wrapper.classes('nancalui-row__wrap')).toBe(true);
  });
});

describe('n-col', () => {
  const value = 8;

  it('n-col flex', () => {
    const wrapper = mount(Row, {
      slots: {
        default: () => h(Col, { flex: value }),
      },
    });
    expect(wrapper.find('.nancalui-col').attributes()).toMatchObject({ style: `flex: ${value} ${value} auto;` });
  });

  it('n-col order', () => {
    const wrapper = mount(Row, {
      slots: {
        default: () => h(Col, { order: value }),
      },
    });
    expect(wrapper.find('.nancalui-col').attributes()).toMatchObject({ style: `order: ${value};` });
  });

  const props: (keyof ColProps)[] = ['span', 'offset', 'pull', 'push'];
  props.forEach((item) => {
    const prop = { [item]: value };
    it(`n-col ${item}`, () => {
      const wrapper = mount(Row, {
        slots: {
          default: () => h(Col, prop),
        },
      });
      expect(wrapper.findAll(`.nancalui-col__${item}--${value}`).length).toBe(1);
    });
  });

  const sizes = Object.keys(screenMedias) as (keyof typeof screenMedias)[];
  sizes.forEach((item) => {
    const prop = { [item]: value };
    it(`n-col ${item} span`, () => {
      const wrapper = mount(Row, {
        slots: {
          default: () => h(Col, prop),
        },
      });
      expect(wrapper.findAll(`.nancalui-col__${item}--span-${value}`).length).toBe(1);
    });
  });

  it('n-row gutter', async () => {
    const wrapper = mount(Row, {
      props: {
        gutter: 8,
      },
      slots: {
        default: () => h(Col),
      },
    });

    expect(wrapper.find('.nancalui-col').attributes()).toMatchObject({ style: 'padding: 0px 4px 0px 4px;' });

    await wrapper.setProps({ gutter: [8, 8] });
    expect(wrapper.find('.nancalui-col').attributes()).toMatchObject({ style: 'padding: 4px 4px 4px 4px;' });
  });
});
