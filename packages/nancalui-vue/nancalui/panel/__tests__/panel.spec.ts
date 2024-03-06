import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import NButton from '../../button/index';
import NPanel from '../src/panel';
import NPanelHeader from '../src/components/panel-header';
import NPanelBody from '../src/components/panel-body';
import NPanelFooter from '../src/components/panel-footer';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('panel', true);

describe('NPanel', () => {
  // 渲染测试
  it('Render', () => {
    // except(wrapper.html())
    const wrapper = mount({
      components: {
        NPanel,
        NPanelBody,
        NPanelHeader,
        NPanelFooter,
        NButton,
      },
      template: `
            <n-panel>
                <n-panel-header>
                    Panel with foldable
                </n-panel-header>
                <n-panel-body>
                    This is body
                </n-panel-body>
            </n-panel>
            `,
    });
    expect(wrapper.find(ns.b()).exists()).toBe(true);
  });

  it('isCollapsed', async () => {
    const wrapper = mount({
      components: {
        NPanel,
        NPanelBody,
        NPanelHeader,
        NPanelFooter,
      },
      template: `
            <n-panel :isCollapsed="isCollapsed">
                <n-panel-header>
                    Panel with foldable
                </n-panel-header>
                <n-panel-body>
                    This is body
                </n-panel-body>
            </n-panel>
            `,
      setup() {
        const isCollapsed = ref(false);
        return { isCollapsed };
      },
    });
    expect(wrapper.find('.nancalui-panel .nancalui-panel-default').element.children[0].innerHTML).toBe('<!---->');
  });

  it('padding-dynamic', async () => {
    const wrapper = mount({
      components: {
        NPanel,
        NPanelBody,
        NPanelHeader,
        NPanelFooter,
        NButton,
      },
      template: `
            <n-panel :hasLeftPadding = "leftPadding" isCollapsed>
                <n-panel-header>
                    Panel with foldable
                </n-panel-header>
                <n-panel-body>
                    This is body
                </n-panel-body>
            </n-panel>
            <br /><br />
            <button @click="change" >
                切换LeftPadding
            </button>
            `,
      setup() {
        const leftPadding = ref(false);
        const change = () => {
          leftPadding.value = !leftPadding.value;
        };
        return {
          leftPadding,
          change,
        };
      },
    });
    expect(wrapper.find('.nancalui-panel-body-collapse').classes().length).toBe(3);
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.nancalui-panel-body-collapse').classes().length).toBe(2);
  });

  it('beforeToggle-dynamic', async () => {
    const wrapper = mount({
      components: {
        NPanel,
        NPanelBody,
        NPanelHeader,
        NPanelFooter,
      },
      template: `
            <n-panel :beforeToggle="beforeToggle" isCollapsed>
                <n-panel-header>
                    Panel with foldable
                </n-panel-header>
                <n-panel-body>
                    This is body
                </n-panel-body>
            </n-panel>
            <br /><br />
            <button @click="panelToggle = !panelToggle" >
                {{ panelToggle ? '阻止折叠' : '允许折叠' }}
            </button>
            `,
      setup() {
        const panelToggle = ref(false);
        const beforeToggle = () => panelToggle.value;
        return {
          panelToggle,
          beforeToggle,
        };
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.panelToggle).toBe(true);
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.panelToggle).toBe(false);
  });
});
