import { FullscreenProps } from './fullscreen-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

interface CompatibleHTMLElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

interface CompatibleDocument extends Document {
  exitFullscreen: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

const ns = useNamespace('fullscreen');

// 页面全屏
export const launchNormalFullscreen = (targetElement: HTMLElement, props: FullscreenProps): void => {
  targetElement.classList.add(ns.b());
  targetElement.setAttribute('style', `z-index: ${props.zIndex ? props.zIndex : 'calc(var(--nancalui-z-index-modal, 1050) + 1 )'}`);
};

// 退出正常全屏
export const exitNormalFullscreen = (targetElement: HTMLElement): void => {
  targetElement.classList.remove(ns.b());
  targetElement.style.zIndex = '';
};

export const launchImmersiveFullScreen = async (docElement: CompatibleHTMLElement): Promise<boolean | undefined> => {
  let fullscreenLaunch = null;
  const main: any = document.getElementsByTagName('body')[0];
  if (main.requestFullscreen) {
    fullscreenLaunch = main.requestFullscreen();
  } else if (main.mozRequestFullScreen) {
    fullscreenLaunch = main.mozRequestFullScreen();
  } else if (main.webkitRequestFullScreen) {
    fullscreenLaunch = Promise.resolve(main.webkitRequestFullScreen());
  } else if (main.msRequestFullscreen) {
    fullscreenLaunch = Promise.resolve(main.msRequestFullscreen());
  }
  return await fullscreenLaunch?.then(() => !!main.fullscreenElement);
};

export const exitImmersiveFullScreen = async (doc: CompatibleDocument): Promise<boolean | undefined> => {
  let fullscreenExit = null;
  if (doc.exitFullscreen) {
    fullscreenExit = doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    fullscreenExit = doc.mozCancelFullScreen();
  } else if (doc.webkitCancelFullScreen) {
    fullscreenExit = Promise.resolve(doc.webkitCancelFullScreen());
  } else if (doc.msExitFullscreen) {
    fullscreenExit = Promise.resolve(doc.msExitFullscreen());
  }
  return await fullscreenExit?.then(() => !!document.fullscreenElement);
};

export const addFullScreenStyle = (): void => {
  document.getElementsByTagName('html')[0].classList.add(ns.e('html'));
};

export const removeFullScreenStyle = (): void => {
  document.getElementsByTagName('html')[0].classList.remove(ns.e('html'));
};
