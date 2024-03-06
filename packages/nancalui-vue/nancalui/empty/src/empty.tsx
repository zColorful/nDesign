import { defineComponent, computed, toRefs, render } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { addUnit } from '../../table-v/src/utils';
import type { SetupContext } from 'vue';
import { emptyProps, EmptyProps } from './empty-types';
import './empty.scss';
// eslint-disable-next-line import/namespace
import ImgEmpty from './img-empty';
import type { CSSProperties, StyleValue } from 'vue';

export default defineComponent({
  name: 'NEmpty',
  props: emptyProps,
  emits: [],
  setup(props: EmptyProps, ctx: SetupContext) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    const { image, description, imageSize } = toRefs(props);
    // console.log(data.value);
    // const { t } = useLocale()
    const ns = useNamespace('empty');
    const emptyDescription = computed(() => description.value || '暂无数据');

    const imageStyle = computed<CSSProperties>(() => ({
      width: addUnit(imageSize?.value),
    }));
    return {
      ctx,
      ns,
      imageStyle,
      image,
      emptyDescription,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('image')} style={this.imageStyle as any}>
          {this.image ? <img src={this.image} /> : this.ctx.slots?.image ? this.ctx.slots?.image() : <ImgEmpty />}
        </div>
        <div class={this.ns.e('description')}>
          {this.ctx.slots?.description ? this.ctx.slots?.description() : <p>{this.emptyDescription}</p>}
        </div>
        {this.ctx.slots?.default && <div class={this.ns.e('bottom')}> {this.ctx.slots?.default()}</div>}
      </div>
    );
  },
});
