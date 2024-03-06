import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance, nextTick, ref } from 'vue';
import { Menu, SubMenu, MenuItem } from '../index';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('menu');
const SubNs = useNamespace('submenu');
const dotNs = useNamespace('menu', true);
const dotSubNs = useNamespace('submenu', true);

const menuVertical = ns.b() + '-vertical';
const menuHorizontal = ns.b() + '-horizontal';
const dotMenuItem = dotNs.b() + '-item';
const dotMenuItemVerticalWrapper = dotNs.b() + '-item-vertical-wrapper';
const dotSubMenu = dotSubNs.b();
const submenuDisabled = SubNs.b() + '-disabled';
const menuitemDisabled = ns.b() + '-item-disabled';

describe('menu test', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('menu - basic render test', async () => {
    wrapper = mount({
      components: {
        'n-menu': Menu,
        'n-sub-menu': SubMenu,
        'n-menu-item': MenuItem,
      },
      template: `
      <n-menu>
        <n-menu-item key="home">首页</n-menu-item>
        <n-sub-menu title="课程" key="course">
          <n-menu-item key="c"> C </n-menu-item>
          <n-sub-menu title="Python" key="python">
            <n-menu-item key="basic"> 基础 </n-menu-item>
            <n-menu-item key="advanced"> 进阶 </n-menu-item>
          </n-sub-menu>
        </n-sub-menu>
        <n-menu-item key="person">个人</n-menu-item>
        <n-menu-item key="custom" href="https://www.baidu.com"> Link To Baidu </n-menu-item>
      </n-menu>
      `,
    });

    await nextTick();

    expect(wrapper.classes().includes(menuVertical)).toBe(true);
    expect(wrapper.find(dotSubMenu).exists()).toBe(true);
    expect(wrapper.find(dotMenuItem).exists()).toBe(true);
    expect(wrapper.find(dotMenuItemVerticalWrapper).exists()).toBe(true);
    await wrapper.setProps({
      mode: 'horizontal',
    });
    expect(wrapper.classes().includes(menuHorizontal)).toBe(true);
  });

  // 参数动态测试 - defaultSelectKeys
  it('menu defaultSelectKeys work', async () => {
    //
    wrapper = mount({
      components: {
        'n-menu': Menu,
        'n-sub-menu': SubMenu,
        'n-menu-item': MenuItem,
      },
      template: `
        <n-menu :default-select-keys="selectKeys">
          <n-menu-item key='test'>
            Test
          </n-menu-item>
          <n-menu-item key='test2'>
            Test2
          </n-menu-item>
        </n-menu>
        <button @click="clickHandle">Change key</button>
      `,
      setup() {
        const selectKeys = ref(['test']);
        const clickHandle = () => {
          selectKeys.value[0] = 'test2';
          console.log(selectKeys.value);
        };
        return {
          selectKeys,
          clickHandle,
        };
      },
    });
    await nextTick();
    expect(wrapper.findAll('li')[0].classes().includes('nancalui-menu-item-select')).toBe(true);
    expect(wrapper.findAll('li')[1].classes().includes('nancalui-menu-item-select')).toBe(false);
  });

  // 参数动态测试 - openKeys
  it('menu - dynamic attr - openKeys', async () => {
    //
    wrapper = mount({
      components: {
        'n-menu': Menu,
        'n-sub-menu': SubMenu,
        'n-menu-item': MenuItem,
      },
      template: `
        <n-menu :open-keys="defaultOpenKey">
          <n-sub-menu key="1">
            <n-menu-item key="SubMenu>Item1">
              SubMenu > Item 1
            </n-menu-item>
            <n-menu-item key="SubMenu>Item2">
              SubMenu > Item 2
            </n-menu-item>
          </n-sub-menu>
          <n-sub-menu key="2" >
            <n-menu-item key="SubMenu2>Item1">
              SubMenu2 > Item 1
            </n-menu-item>
            <n-menu-item key="SubMenu2>Item2">
              SubMenu2 > Item 2
            </n-menu-item>
          </n-sub-menu>
        </n-menu>
        <button @click=change>Click to Change openKeys</button>
      `,
      setup() {
        const defaultOpenKey = ref(['1']);
        const change = () => {
          if (defaultOpenKey.value.length < 2) {
            defaultOpenKey.value.push('2');
          } else {
            defaultOpenKey.value.pop();
          }
        };
        return {
          defaultOpenKey,
          change,
        };
      },
    });
    expect(wrapper.findAll('i')[0].classes().includes('is-opened')).toBe(true);
    expect(wrapper.findAll('i')[1].classes().includes('is-opened')).toBe(false);
  });
  it.todo('props mode(vertical/horizontal) work well.');

  it.todo('props multiple work well.');

  it.todo('props collapsed-indent work well.');

  it.todo('props disabled work well.');

  it.todo('props router work well.');

  it.todo('slot icon work well.');
  it('menu - disabled', async () => {
    wrapper = wrapper = mount({
      components: {
        'n-menu': Menu,
        'n-sub-menu': SubMenu,
        'n-menu-item': MenuItem,
      },
      template: `
      <n-menu>
        <n-menu-item key="home">首页</n-menu-item>
        <n-sub-menu title="课程" key="course" class="course" disabled>
          <n-menu-item key="c"> C </n-menu-item>
          <n-sub-menu title="Python" key="python">
            <n-menu-item key="basic"> 基础 </n-menu-item>
            <n-menu-item key="advanced"> 进阶 </n-menu-item>
          </n-sub-menu>
        </n-sub-menu>
        <n-menu-item key="person">个人</n-menu-item>
        <n-menu-item key="custom" href="https://www.baidu.com" disabled> Link To Baidu </n-menu-item>
      </n-menu>
      `,
    });
    await nextTick();
    expect(wrapper.findAll(dotMenuItem).at(-1)?.classes().includes(menuitemDisabled)).toBe(true);
    expect(wrapper.find('.course').classes().includes(submenuDisabled)).toBe(true);
  });
});
