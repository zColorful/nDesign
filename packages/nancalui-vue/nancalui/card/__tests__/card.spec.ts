import { mount } from '@vue/test-utils';
import NCard from '../src/card';
import NAvatar from '../../avatar/src/avatar';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('card', true);
const avatar = useNamespace('avatar');

const avatarBaseClass = avatar.b();
const titleClass = ns.e('title');
const subtitleClass = ns.e('subtitle');
const contentClass = ns.e('content');
const actionsClass = ns.e('actions');
const metaClass = ns.e('meta');
const cardBlockClass = '.card-block';
const spaceBetweenClass = `${ns.em('actions', 'align')}-spaceBetween`;
const alwaysShadowClass = ns.em('shadow', 'always');
const hoverShadowClass = ns.em('shadow', 'hover');
const neverShadowClass = ns.em('shadow', 'never');

describe('card', () => {
  it('should render correctly', async () => {
    const wrapper = mount(NCard);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly avatar', async () => {
    const wrapper = mount({
      components: {
        NCard,
        NAvatar,
      },
      template: `
        <n-card class="n-card">
          <template #avatar>
            <n-avatar name="nancalui"></n-avatar>
          </template>
        </n-card>
      `,
    });
    const avatarComponent = wrapper.findAllComponents({ name: 'NAvatar' })[0];
    expect(avatarComponent.classes()).toContain(avatarBaseClass);
  });

  it('in v-slot mode should render correctly avatar', async () => {
    const wrapper = mount({
      components: {
        NCard,
        NAvatar,
      },
      template: `
        <n-card class="n-card">
          <template v-slot:avatar>
            <n-avatar name="nancalui"></n-avatar>
          </template>
        </n-card>
      `,
    });
    const avatarComponent = wrapper.findAllComponents({ name: 'NAvatar' })[0];
    expect(avatarComponent.classes()).toContain(avatarBaseClass);
  });

  it('should render correctly title', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template #title>
            nancalui
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(titleClass).text()).toBe('nancalui');
  });

  it('in v-slot mode should render title', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template v-slot:title>
            nancalui Course
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(titleClass).text()).toBe('nancalui Course');
  });

  it('should render correctly subtitle', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template #subtitle>
            nancalui
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(subtitleClass).text()).toBe('nancalui');
  });

  it('in v-slot mode should render subtitle', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template v-slot:subtitle>
            nancalui
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(subtitleClass).text()).toBe('nancalui');
  });

  it('should render correctly content', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template #content>
            nancalui
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(contentClass).text()).toBe('nancalui');
  });

  it('in v-slot mode should render content', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template v-slot:content>
            nancalui
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(contentClass).text()).toBe('nancalui');
  });

  it('should render correctly actions', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template #actions>
            <div class="card-block">
              btn
            </div>
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(actionsClass).exists()).toBeTruthy();
    expect(wrapper.find(cardBlockClass).text()).toBe('btn');
  });

  it('in v-slot mode should render actions', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card">
          <template #actions>
            <div class="card-block">
              btn
            </div>
          </template>
        </n-card>
      `,
    });
    expect(wrapper.find(actionsClass).exists()).toBeTruthy();
    expect(wrapper.find(cardBlockClass).text()).toBe('btn');
  });

  it('should render correctly image', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card" :src="'https://devui.design/components/assets/image1.png'">
        </n-card>
      `,
    });
    expect(wrapper.find(metaClass).attributes('src').includes('https://devui.design/components/assets/image1.png')).toBeTruthy();
  });

  it('should render correctly align', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card class="n-card" :align="'spaceBetween'">
        </n-card>
      `,
    });
    expect(wrapper.find(spaceBetweenClass).exists()).toBeTruthy();
  });

  it('should render correctly shadow', async () => {
    const wrapper = mount({
      components: {
        NCard,
      },
      template: `
        <n-card >
        </n-card>
      `,
    });
    expect(wrapper.find(hoverShadowClass).exists()).toBeTruthy();

    await wrapper.setProps({
      shadow: 'always',
    });
    expect(wrapper.find(alwaysShadowClass).exists()).toBeTruthy();

    await wrapper.setProps({
      shadow: 'never',
    });
    expect(wrapper.find(neverShadowClass).exists()).toBeTruthy();
  });
});
