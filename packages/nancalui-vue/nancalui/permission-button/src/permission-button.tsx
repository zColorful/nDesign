import { defineComponent, onBeforeMount, reactive } from 'vue';
import { permissionButtonProps, PermissionButtonProps } from './permission-button-types';
import NSvgIcon from '../../icon/src/svg-icon';
import './permission-button.scss';
export default defineComponent({
  name: 'NPermissionButton',
  props: permissionButtonProps,
  emits: ['click'],
  setup(props: PermissionButtonProps, ctx) {
    let codeList = reactive<string[]>([]);
    onBeforeMount(() => {
      codeList = window?.localStorage?.getItem('codeList')?.split(',') || [
        'imageSource:add',
        'imageSource:edit',
        'imageSource:del',
        'standManage:edit',
        'standardCodeManage:upload',
      ];
    });
    const clickButton = () => {
      console.log('in');
      ctx.emit('click');
    };
    return () => {
      if (codeList.includes(props.permCode)) {
        return (
          <n-button onClick={clickButton} color={props.color} variant={props.variant} size={props.size} class="permission-btn">
            {props.icon && <NSvgIcon name={props.icon} size="16px" />}
            {props.name}
          </n-button>
        );
      } else {
        return null;
      }
    };
  },
});
