import { Theme } from './theme';
export const nancaluiLightTheme: Theme = new Theme({
  id: 'nancalui-light-theme',
  name: 'Light Mode',
  cnName: '浅色主题',
  data: {
    // 基础变量
    'nancalui-global-bg': '#f3f6f8',
    'nancalui-global-bg-normal': '#ffffff',
    'nancalui-base-bg': '#ffffff',
    'nancalui-base-bg-dark': '#333854',
    'nancalui-brand': '#447DFD',
    'nancalui-brand-foil': '#859bff',
    'nancalui-brand-hover': '#6E9EFF',
    'nancalui-brand-active': '#2F5CD6',
    'nancalui-brand-active-focus': '#0069AF',
    'nancalui-contrast': '#F63838',
    'nancalui-text': '#000000',
    'nancalui-text-weak': '#575d6c',
    'nancalui-aide-text': '#8a8e99',
    'nancalui-aide-text-stress': '#575d6c',
    'nancalui-placeholder': '#8a8e99',
    'nancalui-light-text': '#ffffff',
    'nancalui-dark-text': '#252b3a',
    'nancalui-link': '#2F5CD6',
    'nancalui-link-active': '#2F5CD6',
    'nancalui-link-light': '#67C7FF',
    'nancalui-link-light-active': '#94DFFF',
    'nancalui-line': '#C8C9CC',
    'nancalui-dividing-line': '#e1e1e1',
    'nancalui-block': '#ffffff',
    'nancalui-area': '#f8f8f8',
    'nancalui-danger': '#F63838',
    'nancalui-warning': '#FF7D00',
    'nancalui-warning-hover': '#FF9729',
    'nancalui-warning-active': '#D96200',
    'nancalui-success': '#04C495',
    'nancalui-success-hover': '#26D1A1',
    'nancalui-info': '#447DFD',
    'nancalui-initial': '#F0F7FF',
    'nancalui-unavailable': '#F7F8FA',
    'nancalui-shadow': 'rgba(37, 43, 58, 0.2)',
    'nancalui-light-shadow': 'rgba(37, 43, 58, 0.1)',
    // 图标
    'nancalui-icon-text': '#252b3a',
    'nancalui-icon-bg': '#ffffff',
    'nancalui-icon-fill': '#71757f',
    'nancalui-icon-fill-hover': '#252b3a',
    'nancalui-icon-fill-active': '#252b3a',
    'nancalui-icon-fill-active-hover': '#2F5CD6',
    // 表单
    'nancalui-form-control-line': '#C8C9CC',
    'nancalui-form-control-line-hover': '#575d6c',
    'nancalui-form-control-line-active': '#447DFD',
    'nancalui-form-control-line-active-hover': '#0069AF',
    'nancalui-list-item-active-bg': '#447DFD',
    'nancalui-list-item-active-text': '#ffffff',
    'nancalui-list-item-active-hover-bg': '#2F5CD6',
    'nancalui-list-item-hover-bg': '#f2f5fc',
    'nancalui-list-item-hover-text': '#2F5CD6',
    'nancalui-list-item-selected-bg': '#F0F7FF',
    'nancalui-list-item-strip-bg': '#f2f5fc',
    // 禁用
    'nancalui-disabled-bg': '#F7F8FA',
    'nancalui-disabled-line': '#e1e1e1',
    'nancalui-disabled-text': '#C8C9CC',
    'nancalui-primary-disabled': '#94DFFF',
    'nancalui-icon-fill-active-disabled': '#94DFFF',
    // 特殊背景色
    'nancalui-label-bg': '#eef0f5',
    'nancalui-connected-overlay-bg': '#ffffff',
    'nancalui-connected-overlay-line': '#2F5CD6',
    'nancalui-fullscreen-overlay-bg': '#ffffff',
    'nancalui-feedback-overlay-bg': '#464d6e',
    'nancalui-feedback-overlay-text': '#e1e1e1',
    'nancalui-embed-search-bg': '#f2f5fc',
    'nancalui-embed-search-bg-hover': '#eef0f5',
    'nancalui-float-block-shadow': 'rgba(94, 124, 224, 0.3)',
    'nancalui-highlight-overlay': 'rgba(255, 255, 255, 0.8)',
    'nancalui-range-item-hover-bg': '#F0F7FF',
    // 按钮
    'nancalui-primary': '#447DFD',
    'nancalui-primary-hover': '#6E9EFF',
    'nancalui-primary-active': '#2F5CD6',
    'nancalui-contrast-hover': '#d64a52',
    'nancalui-contrast-active': '#E72B2D',
    // 状态
    'nancalui-danger-line': '#FFE2DE',
    'nancalui-danger-hover': '#FF6963',
    'nancalui-danger-active': '#CF252B',
    'nancalui-danger-bg': '#ffeeed',
    'nancalui-warning-line': '#FFDCA3',
    'nancalui-warning-bg': '#fff3e8',
    'nancalui-info-line': '#447DFD',
    'nancalui-info-bg': '#f2f5fc',
    'nancalui-success-line': '#75EBC2',
    'nancalui-success-bg': '#edfff9',
    'nancalui-primary-line': '#447DFD',
    'nancalui-primary-bg': '#447DFD',
    'nancalui-default-line': '#447DFD',
    'nancalui-default-bg': '#f3f6f8',
    // 字体设置相关
    'nancalui-font-size': '12px',
    'nancalui-font-size-card-title': '16px',
    'nancalui-font-size-page-title': '16px',
    'nancalui-font-size-modal-title': '18px',
    'nancalui-font-size-price': '20px',
    'nancalui-font-size-data-overview': '24px',
    'nancalui-font-size-icon': '16px',
    'nancalui-font-size-sm': '12px',
    'nancalui-font-size-md': '12px',
    'nancalui-font-size-lg': '14px',
    'nancalui-font-title-weight': 'bold',
    'nancalui-font-content-weight': 'normal',
    'nancalui-line-height-base': '1.5',
    'nancalui-input-placeholder': '#B8B8B8',
    // 圆角
    'nancalui-border-radius': '2px',
    'nancalui-border-radius-feedback': '4px',
    'nancalui-border-radius-card': '6px',
    // 阴影
    'nancalui-shadow-length-base': '0 1px 4px 0',
    'nancalui-shadow-length-slide-left': '-2px 0 8px 0',
    'nancalui-shadow-length-slide-right': '2px 0 8px 0',
    'nancalui-shadow-length-connected-overlay': '0 2px 8px 0',
    'nancalui-shadow-length-hover': '0 4px 16px 0',
    'nancalui-shadow-length-feedback-overlay': '0 4px 16px 0',
    'nancalui-shadow-fullscreen-overlay': '0 8px 40px 0',
    // 动效
    'nancalui-animation-duration-slow': '300ms',
    'nancalui-animation-duration-base': '200ms',
    'nancalui-animation-duration-fast': '100ms',
    'nancalui-animation-ease-in': 'cubic-bezier(0.5, 0, 0.84, 0.25)',
    'nancalui-animation-ease-out': 'cubic-bezier(0.16, 0.75, 0.5, 1)',
    'nancalui-animation-ease-in-out': 'cubic-bezier(0.5, 0.05, 0.5, 0.95)',
    'nancalui-animation-ease-in-out-smooth': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    'nancalui-animation-linear': 'cubic-bezier(0, 0, 1, 1)',
    // zIndex
    'nancalui-z-index-full-page-overlay': '1080',
    'nancalui-z-index-pop-up': '1060',
    'nancalui-z-index-dropdown': '1062',
    'nancalui-z-index-modal': '1070',
    'nancalui-z-index-drawer': '1040',
    'nancalui-z-index-framework': '1000',

    // Menu
    'nancalui-menu-bg': '#2A325A', // 背景色
    'nancalui-menu-item': 'rgba(255, 255, 255, 0.55)', // 字体色
    'nancalui-menu-item-hover': '#fff', // 选中字体色
    'nancalui-menu-disabled': '#919191',
    'nancalui-menu-item-sub': '#10131E',

    // 表格
    'nancalui-table-bg': '#F7F8FA', // 表头背景色
    'nancalui-table-line': '#EBEDF0', // 边框色
    'nancalui-table-h-color': '#000000', // 表头字体色
    'nancalui-table-b-color': '#333333', // 表体字体色
    // input

    'nancalui-input-border-color': '#CFCFCF', // 边框色
    // 分割线
    'nancalui-divider': '#EBEDF0', // 分割线色
    "nancalui-form-label-color": "#000000" // form
  },
  isDark: false,
});
export const nancaluiGreenTheme: Theme = new Theme({
  id: 'nancalui-green-theme',
  name: 'Green - Light Mode',
  cnName: '绿色主题',
  data: {
    ...nancaluiLightTheme.data,
    'nancalui-global-bg': '#f3f8f7',
    'nancalui-brand': '#3DCCA6',
    'nancalui-brand-foil': '#7fdac1',
    'nancalui-brand-hover': '#6DDEBB',
    'nancalui-brand-active': '#07c693',
    'nancalui-brand-active-focus': '#369676',
    'nancalui-link': '#07c693',
    'nancalui-link-active': '#07c693',
    'nancalui-link-light': '#96fac8',
    'nancalui-link-light-active': '#befade',
    'nancalui-info': '#079CCD',
    'nancalui-initial': '#CCCCCC',
    'nancalui-icon-fill-active': '#3DCCA6',
    'nancalui-icon-fill-active-hover': '#07c693',
    'nancalui-form-control-line-active': '#3DCCA6',
    'nancalui-form-control-line-active-hover': '#2EB28A',
    'nancalui-list-item-active-bg': '#3DCCA6',
    'nancalui-list-item-active-hover-bg': '#07c693',
    'nancalui-list-item-hover-bg': '#f3fef9',
    'nancalui-list-item-hover-text': '#07c693',
    'nancalui-list-item-selected-bg': '#f3fef9',
    'nancalui-list-item-strip-bg': '#f3fef9',
    'nancalui-connected-overlay-line': '#07c693',
    'nancalui-embed-search-bg': '#f3fef9',
    'nancalui-float-block-shadow': 'rgba(94, 224, 181, 0.3)',
    'nancalui-primary': '#3DCCA6',
    'nancalui-primary-hover': '#6DDEBB',
    'nancalui-primary-active': '#369676',
    'nancalui-info-line': '#0486b1',
    'nancalui-info-bg': '#e3f0f5',
    'nancalui-success-line': '#50d492',
    'nancalui-success-bg': '#edfff9',
    'nancalui-primary-line': '#3DCCA6',
    'nancalui-primary-bg': '#447DFD',
    'nancalui-default-line': '#3DCCA6',
    'nancalui-default-bg': '#f3f8f7',
    'nancalui-primary-disabled': '#c5f0e5',
    'nancalui-icon-fill-active-disabled': '#c5f0e5',
    'nancalui-range-item-hover-bg': '#d8f9ea',
  },
  extends: 'nancalui-light-theme',
  isDark: false,
});
export const nancaluiDarkTheme: Theme = new Theme({
  id: 'nancalui-dark-theme',
  name: 'Dark Mode',
  cnName: '深色主题',
  data: {
    'nancalui-global-bg': '#202124',
    'nancalui-global-bg-normal': '#202124',
    'nancalui-base-bg': '#2E2F31',
    'nancalui-base-bg-dark': '#2e2f31',
    'nancalui-brand': '#447DFD',
    'nancalui-brand-foil': '#313a61',
    'nancalui-brand-hover': '#425288',
    'nancalui-brand-active': '#2F5CD6',
    'nancalui-brand-active-focus': '#0069AF',
    'nancalui-contrast': '#F63838',
    'nancalui-text': '#E8E8E8',
    'nancalui-text-weak': '#A0A0A0',
    'nancalui-aide-text': '#909090',
    'nancalui-aide-text-stress': '#A0A0A0',
    'nancalui-placeholder': '#8A8A8A',
    'nancalui-light-text': '#ffffff',
    'nancalui-dark-text': '#252b3a',
    'nancalui-link': '#2F5CD6',
    'nancalui-link-active': '#0069AF',
    'nancalui-link-light': '#67C7FF',
    'nancalui-link-light-active': '#94DFFF',
    'nancalui-line': '#505153',
    'nancalui-dividing-line': '#3D3E40',
    'nancalui-block': '#606061',
    'nancalui-area': '#34363A',
    'nancalui-danger': '#f66f6a',
    'nancalui-warning': '#fac20a',
    'nancalui-waiting': '#5e6580',
    'nancalui-success': '#50d4ab',
    'nancalui-info': '#447DFD',
    'nancalui-initial': '#64676e',
    'nancalui-unavailable': '#5b5b5c',
    'nancalui-shadow': 'rgba(17, 18, 19, 0.4)',
    'nancalui-light-shadow': 'rgba(17, 18, 19, 0.5)',
    // 图标
    'nancalui-icon-text': '#E8E8E8',
    'nancalui-icon-bg': '#2E2F31',
    'nancalui-icon-fill': '#606061',
    'nancalui-icon-fill-hover': '#73788a',
    'nancalui-icon-fill-active': '#447DFD',
    'nancalui-icon-fill-active-hover': '#2F5CD6',
    // 表单
    'nancalui-form-control-line': '#505153',
    'nancalui-form-control-line-hover': '#909090',
    'nancalui-form-control-line-active': '#447DFD',
    'nancalui-form-control-line-active-hover': '#0069AF',
    'nancalui-list-item-active-bg': '#447DFD',
    'nancalui-list-item-active-text': '#ffffff',
    'nancalui-list-item-active-hover-bg': '#2F5CD6',
    'nancalui-list-item-hover-bg': '#383838',
    'nancalui-list-item-hover-text': '#2F5CD6',
    'nancalui-list-item-selected-bg': '#454545',
    'nancalui-list-item-strip-bg': '#383838',
    // 禁用
    'nancalui-disabled-bg': '#3D3E44',
    'nancalui-disabled-line': '#505153',
    'nancalui-disabled-text': '#7D7D7D',
    'nancalui-primary-disabled': '#2B3458',
    'nancalui-icon-fill-active-disabled': '#2B3458',
    // 特殊背景色
    'nancalui-label-bg': '#46443F',
    'nancalui-connected-overlay-bg': '#2F2F2F',
    'nancalui-connected-overlay-line': '#2F5CD6',
    'nancalui-fullscreen-overlay-bg': '#2E2F31',
    'nancalui-feedback-overlay-bg': '#4C4C4C',
    'nancalui-feedback-overlay-text': '#e1e1e1',
    'nancalui-embed-search-bg': '#383838',
    'nancalui-embed-search-bg-hover': '#3D3E40',
    'nancalui-float-block-shadow': 'rgba(94, 124, 224, 0.3)',
    'nancalui-highlight-overlay': 'rgba(255, 255, 255, 0.1)',
    'nancalui-range-item-hover-bg': '#454545',
    // 按钮
    'nancalui-primary': '#447DFD',
    'nancalui-primary-hover': '#425288',
    'nancalui-primary-active': '#2F5CD6',
    'nancalui-contrast-hover': '#D64A52',
    'nancalui-contrast-active': '#E72B2D',
    // 状态
    'nancalui-danger-line': '#985C5A',
    'nancalui-danger-bg': '#4B3A39',
    'nancalui-warning-line': '#8D6138',
    'nancalui-warning-bg': '#554434',
    'nancalui-info-line': '#546BB7',
    'nancalui-info-bg': '#383D4F',
    'nancalui-success-line': '#5D887D',
    'nancalui-success-bg': '#304642',
    'nancalui-primary-line': '#546BB7',
    'nancalui-primary-bg': '#447DFD',
    'nancalui-default-line': '#447DFD',
    'nancalui-default-bg': '#383838',

    // Menu
    'nancalui-menu-item': '#dcdcdc',
  },
  extends: 'nancalui-light-theme',
  isDark: true,
});
export const nancaluiGreenDarkTheme: Theme = new Theme({
  id: 'nancalui-green-dark-theme',
  name: 'Green - Dark Mode',
  cnName: '绿色深色主题',
  data: {
    ...nancaluiDarkTheme.data,
    'nancalui-brand': '#3DCCA6',
    'nancalui-brand-foil': '#395e54',
    'nancalui-brand-hover': '#4c9780',
    'nancalui-brand-active': '#07c693',
    'nancalui-brand-active-focus': '#297058',
    'nancalui-link': '#07c693',
    'nancalui-link-active': '#08a57b',
    'nancalui-info': '#046788',
    'nancalui-initial': '#64676e',
    'nancalui-icon-fill-active': '#3DCCA6',
    'nancalui-icon-fill-active-hover': '#07c693',
    'nancalui-form-control-line-active': '#3DCCA6',
    'nancalui-form-control-line-active-hover': '#297058',
    'nancalui-list-item-active-bg': '#3DCCA6',
    'nancalui-list-item-active-hover-bg': '#07c693',
    'nancalui-list-item-hover-text': '#07c693',
    'nancalui-connected-overlay-line': '#07c693',
    'nancalui-embed-search-bg': '#3f4241',
    'nancalui-float-block-shadow': 'rgba(94, 224, 181, 0.3)',
    'nancalui-primary': '#3DCCA6',
    'nancalui-primary-hover': '#6DDEBB',
    'nancalui-primary-active': '#369676',
    'nancalui-info-line': '#035e7c',
    'nancalui-info-bg': '#383c3d',
    'nancalui-primary-line': '#3DCCA6',
    'nancalui-primary-bg': '#447DFD',
    'nancalui-default-line': '#3DCCA6',
    'nancalui-default-bg': '#383838',
    'nancalui-primary-disabled': '#28544B',
    'nancalui-icon-fill-active-disabled': '#28544B',
  },
  extends: 'nancalui-dark-theme',
  isDark: true,
});
