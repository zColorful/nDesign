import { mount } from '@vue/test-utils';
import { reactive, nextTick } from 'vue';

import NQuadrantDiagram from '../src/quadrant-diagram';

describe('n-quadrant-diagram', () => {
  it('quadrantDiagramResponse', async () => {
    const view = reactive({
      height: 200,
      width: 200,
    });

    const wrapper = mount({
      components: { NQuadrantDiagram },
      template: `<n-quadrant-diagram :view='view'/>`,
      propsData: {
        view,
      },
      setup() {
        return {
          view,
        };
      },
    });

    expect(wrapper.find('#nancalui-quadrant-axis-1').element['height']).toEqual(200);
    view.height = 400;
    await nextTick();
    expect(wrapper.find('#nancalui-quadrant-axis-1').element['height']).toEqual(400);
  });
});
