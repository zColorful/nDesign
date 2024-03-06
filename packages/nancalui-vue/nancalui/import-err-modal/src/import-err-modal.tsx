import { defineComponent, toRefs } from 'vue';
import { ImportErrModalProps, importErrModalProps } from './import-err-modal-types';
import NModal from '../../modal/src/modal';
import NModalFooter from '../../modal/src/components/footer';
import NButton from '../../button/src/button';
import './import-err-modal.scss';
export default defineComponent({
  name: 'NImportErrModal',
  props: importErrModalProps,
  Comments: {
    NModal,
    NButton,
    NModalFooter,
  },
  setup(props: ImportErrModalProps, { emit, slots }) {
    const { isShow, content } = toRefs(props);
    const handleClose = () => {
      emit('close');
    };
    return () => (
      <n-modal draggable title="导入结果" v-model={isShow.value} before-close={handleClose}>
        <div class="nancalui-err-modal-title">
          <i class="el-icon-warning"></i>
          <span>导入失败！详细信息如下：</span>
        </div>
        <div class="nancalui-err-modal-content" v-html={content.value}></div>
        {slots.default?.()}
        <n-modal-footer>
          <n-button v-slots="footer" type="primary" onClick={handleClose}>
            关闭
          </n-button>
        </n-modal-footer>
      </n-modal>
    );
  },
});
