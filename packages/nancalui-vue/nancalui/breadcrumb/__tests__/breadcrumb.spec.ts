import { mount } from '@vue/test-utils';
import NBreadcrumb from '../src/breadcrumb';
import NBreadcrumbItem from '../src/breadcrumb-item';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { nextTick } from 'vue';

const ns = useNamespace('breadcrumb', true);
const getEl = (selector: string) => document.body.querySelector(selector);

const itemClass = ns.e('item');
const separatorClass = ns.e('separator');
const isLinkClass = '.is-link';
const getDropdownTitle = () => getEl(ns.e('dropdown-title'));

describe('breadcrumb', () => {
  it('should breadcrumb display correctly', () => {
    const wrapper = mount({
      components: {
        NBreadcrumb,
        NBreadcrumbItem,
      },
      template: `<n-breadcrumb>
            <n-breadcrumb-item>
              <a href="/">nancalui</a>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <span>Breadcrumb</span>
            </n-breadcrumb-item>
          </n-breadcrumb>`,
    });
    const items = wrapper.findAll(itemClass);
    const separators = wrapper.findAll(separatorClass);
    expect(items.length).toBe(2);
    expect(separators.length).toBe(2);
  });

  it('should separator support custom', () => {
    const wrapper = mount({
      components: {
        NBreadcrumb,
        NBreadcrumbItem,
      },
      template: `
      <n-breadcrumb separatorIcon="?">
        <n-breadcrumb-item>A</n-breadcrumb-item>
      </n-breadcrumb>
    `,
    });
    expect(wrapper.find(separatorClass).text()).toBe('?');
  });

  it('should `to` work correctly', () => {
    const wrapper = mount({
      components: {
        NBreadcrumb,
        NBreadcrumbItem,
      },
      template: `
      <n-breadcrumb separatorIcon="?">
        <n-breadcrumb-item to="/index">A</n-breadcrumb-item>
      </n-breadcrumb>
    `,
    });
    expect(wrapper.find(isLinkClass)).toBeTruthy();
  });

  it('should `source` work correct', async () => {
    const wrapper = mount({
      props: {
        source: {
          type: Array,
          default: () => [],
        },
      },
      components: {
        NBreadcrumb,
      },
      template: `
        <n-breadcrumb :source="[
          { title: 'Homepage', link: '/', linkType: 'routerLink', replace: true },
          { title: 'nancalui', link: '/', noNavigation: true },
          { title: 'breadcrumb', showMenu: true, link: '/components/breadcrumb/', target: '_blank', children: [
            {
              title: '基础面包屑',
              link: '/components/breadcrumb/#基础面包屑'
            },
            {
              title: '传入source'
            },
            {
              title: '带下拉菜单的面包屑'
            }
          ]}
        ]"></n-breadcrumb>
      `,
    });
    await nextTick();
    const items = wrapper.findAll(itemClass);
    expect(items.length).toBe(3);

    // hover on dropdowntitle
    const dropdowntitle = getDropdownTitle();
    dropdowntitle?.dispatchEvent(new Event('hover'));

    wrapper.unmount();
  });
});
