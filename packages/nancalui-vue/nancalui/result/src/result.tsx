import { defineComponent } from 'vue';
import { resultProps, ResultProps } from './result-types';
import Icon from '../../icon/src/icon';
import './result.scss';

export default defineComponent({
  name: 'NResult',
  props: resultProps,
  setup(props: ResultProps, ctx) {
    enum IconEnum {
      success = 'right-o',
      danger = 'error-o',
      warning = 'warning-o',
      info = 'info-o',
    }

    return () => {
      return (
        <div class="nancalui-result">
          {ctx.slots.icon ? (
            <div>{ctx.slots?.icon()}</div>
          ) : (
            <Icon name={IconEnum[props.icon] || ''} class={`nancalui-result__icon-${props.icon}`} size="64px" />
          )}
          <div class="nancalui-result__title">{ctx.slots.title ? ctx.slots?.title() : props.title}</div>
          <div class="nancalui-result__desc">{ctx.slots.desc ? ctx.slots?.desc() : props.desc}</div>
          <div class="nancalui-result__extra">{ctx.slots.extra ? ctx.slots?.extra() : ''}</div>
        </div>
      );
    };
  },
});
