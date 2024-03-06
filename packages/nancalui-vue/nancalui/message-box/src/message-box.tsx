import { defineComponent, toRefs, ref } from 'vue';
import { MessageBoxProps, messageBoxProps } from './message-box-types';
import NModal from '../../modal/src/modal';
import NModalHeader from '../../modal/src/components/header';
import NModalFooter from '../../modal/src/components/footer';
import NButton from '../../button/src/button';
import NIcon from '../../icon/src/icon';
import './message-box.scss';
export default defineComponent({
  name: 'NMessageBox',
  components: {
    NModal,
    NButton,
    NModalHeader,
    NModalFooter,
    NIcon,
  },
  props: messageBoxProps,
  setup(props: MessageBoxProps) {
    const { content, title, width, cancel, save, cancelButtonText, saveButtonText } = toRefs(props);
    const isShow = ref(true); // 窗体显示控制
    const handleCancel = () => {
      isShow.value = false;
      cancel.value();
    };
    const handleSave = () => {
      isShow.value = false;
      save.value();
    };
    return () => (
      <n-modal class="message-box-modal" v-model={isShow.value} before-close={handleCancel} width={width.value}>
        <n-modal-header>
          <n-icon name="icon-warning-o"></n-icon>
          <span>{title.value}</span>
        </n-modal-header>

        <div class="nancalui-message-box-content">{content.value}</div>

        <n-modal-footer>
          <n-button variant="solid" color="primary" onClick={handleSave}>
            {saveButtonText.value}
          </n-button>

          <n-button onClick={handleCancel}>{cancelButtonText.value}</n-button>
        </n-modal-footer>
      </n-modal>
    );
  },
});
