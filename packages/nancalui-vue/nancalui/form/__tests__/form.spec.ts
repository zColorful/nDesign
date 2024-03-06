import { mount } from '@vue/test-utils';
import { reactive, ref } from 'vue';
import { Form, FormItem } from '../index';
import { Input } from '../../input';
import { useNamespace } from '../../shared/hooks/use-namespace';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('form', true);

describe('form', () => {
  it('render form', async () => {
    const wrapper = mount({
      components: { 'n-form': Form, 'n-form-item': FormItem, 'n-input': Input },
      setup() {
        const formModel = reactive({
          name: '',
          description: '',
          executionDay: [],
        });
        const size = ref('md');
        const align = ref('start');
        return { formModel, size, align };
      },
      template: `
        <n-form :data="formModel" :label-size="size" :label-align="align">
          <n-form-item field="name" label="Name">
            <n-input v-model="formModel.name" />
          </n-form-item>
        </n-form>
      `,
    });
    expect(wrapper.find(ns.b()).exists()).toBeTruthy();
  });

  it.todo('props label-size/label-align work well.');

  it.todo('props layout work well.');

  it.todo('props size work well.');

  it.todo('props disabled work well.');

  it.todo('form validate work well.');
});
