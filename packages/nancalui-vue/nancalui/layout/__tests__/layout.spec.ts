import { mount } from '@vue/test-utils';
import { Layout, Content, Header, Footer, Aside } from '..';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('layout', true);
describe('Layout test', () => {
  it('header-content-footer layout', async () => {
    const wrapper = mount({
      components: {
        'n-layout': Layout,
        'n-header': Header,
        'n-content': Content,
        'n-footer': Footer,
      },
      template: `
      <n-layout>
        <n-header>Header</n-header>
        <n-content>Content</n-content>
        <n-footer>Footer</n-footer>
      </n-layout>
      `
    });
    const layout = wrapper.find(ns.b());
    expect(layout.exists()).toBeTruthy();
    const header = layout.find(ns.e('header'));
    expect(header.text()).toBe('Header');
    const content = header.element.nextElementSibling;
    expect(content?.innerHTML).toBe('Content');
    const footer = layout.find(ns.e('content')).element.nextElementSibling;
    expect(footer?.innerHTML).toBe('Footer');
  });

  it('header-aside-content-footer layout', async () => {
    const wrapper = mount({
      components: {
        'n-layout': Layout,
        'n-header': Header,
        'n-content': Content,
        'n-footer': Footer,
        'n-aside': Aside,
      },
      template: `
      <n-layout id="outerLayout">
        <n-header>Header</n-header>
        <n-layout id="innerLayout">
          <n-aside>Aside</n-aside>
          <n-content>Content</n-content>
        </n-layout>
        <n-footer>Footer</n-footer>
      </n-layout>
      `
    });
    const outerLayout = wrapper.find('#outerLayout');
    expect(outerLayout.exists()).toBeTruthy();
    const header = outerLayout.find(ns.e('header'));
    expect(header.text()).toBe('Header');
    const innerLayout = outerLayout.find('#innerLayout');
    const aside = innerLayout.find(ns.em('aside', 'inner'));
    const content = innerLayout.find(ns.e('content'));
    expect(content.text()).toBe('Content');
    expect(aside.text()).toBe('Aside');
    expect(outerLayout.find(ns.e('footer')).text()).toBe('Footer');
  });

  it('aside-header-content-footer layout', async () => {
    const wrapper = mount({
      components: {
        'n-layout': Layout,
        'n-header': Header,
        'n-content': Content,
        'n-footer': Footer,
        'n-aside': Aside,
      },
      template: `
      <n-layout id="outerLayout">
        <n-aside>Aside</n-aside>
        <n-layout id="innerLayout">
          <n-header>Header</n-header>
          <n-content>Content</n-content>
          <n-footer>Footer</n-footer>
        </n-layout>
      </n-layout>
      `
    });
    const outerLayout = wrapper.find('#outerLayout');
    expect(outerLayout.element.firstElementChild?.innerHTML).toBe('Aside');
    expect(outerLayout.element.children[1].getAttribute('id')).toBe('innerLayout');
    const innerLayout = outerLayout.find('#innerLayout');
    expect(innerLayout.element.children[0]?.innerHTML).toBe('Header');
    expect(innerLayout.element.children[1]?.innerHTML).toBe('Content');
    expect(innerLayout.element.children[2]?.innerHTML).toBe('Footer');
  });
});
