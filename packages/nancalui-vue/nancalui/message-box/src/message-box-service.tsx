import { reactive, createApp, onUnmounted } from 'vue';
import type { App } from 'vue';
import { MessageBoxOption } from './message-box-types';
import MessageBox from './message-box';

const defaultOptions: MessageBoxOption = {
  width: '430px',
};

function initInstance(props: MessageBoxOption): App {
  const container = document.createElement('div');
  container.classList.add('MessageBox__warpper');
  // const lastChild = document.body.lastElementChild;
  // let offset_Top = 50;
  // if (lastChild?.classList.contains('MessageBox__warpper')) {
  //   const MessageBox = lastChild.lastElementChild as HTMLElement;
  //   const rects = MessageBox.getBoundingClientRect();
  //   const height = rects.height;
  //   const top = rects.top;
  //   offset_Top = height + top;
  // }
  const app: App = createApp({
    setup() {
      onUnmounted(() => {
        document.body.removeChild(container);
      });

      return () => <MessageBox {...props}></MessageBox>;
    },
  });
  document.body.appendChild(container);
  app.mount(container);
  return app;
}

export default class MessageBoxService {
  static open(options: MessageBoxOption): void {
    const props: MessageBoxOption = reactive({
      ...defaultOptions,
      ...options,
    });
    initInstance(props);
  }
}
