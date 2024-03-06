import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  provide,
  Teleport,
  unref,
  readonly,
  Transition,
  onBeforeUnmount,
} from 'vue';
import type { StyleValue, Ref } from 'vue';
import { useReactive, colorPickerResize, isExhibitionColorPicker, changeColorValue } from './utils/composeable';
import { colorPickerProps, ColorPickerProps } from './color-picker-types';
import colorPanel from './components/color-picker-panel/color-picker-panel';
import './color-picker.scss';
import { parseColor, extractColor, RGBAtoCSS } from './utils/color-utils';
import { ColorPickerColor } from './utils/color-utils-types';
export default defineComponent({
  name: 'NColorPicker',
  components: {
    colorPanel,
  },
  props: colorPickerProps,
  emits: ['update:modelValue', 'change'],
  setup(props: ColorPickerProps, { emit, slots }) {
    const DEFAUTL_MODE = 'rgb';
    const provideData = {
      showAlpha: useReactive(() => props.showAlpha),
      swatches: useReactive(() => props.swatches),
      dotSize: useReactive(() => props.dotSize),
      showHistory: useReactive(() => props.showHistory),
    };
    provide('provideData', readonly(provideData));
    const initialColor = ref<Partial<ColorPickerColor>>();
    const colorCubeRef = ref<HTMLElement | null>(null);
    const pickerRef = ref<HTMLElement | null>(null);
    const containerRef = ref<HTMLElement | null>(null);
    const left = ref(0);
    const top = ref(0);
    const isChangeTextColor = ref(true);
    const showColorPicker = ref(false);
    const formItemText = ref(`${props.mode ?? DEFAUTL_MODE}`);
    const mode = ref(unref(props.mode));

    // 更新用户输入颜色 2021.12.10
    function updateUserColor(color: Partial<ColorPickerColor>, isPerson?: boolean) {
      initialColor.value = color;
      // 提取颜色 2021.12.10
      const value = extractColor(initialColor.value as ColorPickerColor, props.modelValue, mode.value as string, props.showAlpha);
      emit('update:modelValue', value);
      if (isPerson) {
        emit('change', value);
      }
    }
    function resize() {
      return colorPickerResize(colorCubeRef as Ref<HTMLElement>, top, left);
    }
    function isExhibition(event: Event) {
      return isExhibitionColorPicker(
        event as PointerEvent,
        colorCubeRef as Ref<HTMLElement>,
        pickerRef as Ref<HTMLElement>,
        showColorPicker
      );
    }
    //  更新选择器位置
    const updatePickerPosition = () => {
      if (colorCubeRef.value && pickerRef.value) {
        const textPalette = colorCubeRef.value?.getBoundingClientRect();
        const pickerRect = pickerRef.value?.getBoundingClientRect();

        const { width: pickerWidth = 0, height: pickerHeight = 0 } = pickerRect || {};
        const { left: textLeft = 0, top: textTop = 0, width: textWidth = 0, height: textHeight = 0 } = textPalette || {};
        //  如果超过边界则往上显示

        const textBottom = textTop + textHeight;
        const textRight = textLeft + textWidth;
        const { scrollX, scrollY } = window;

        let transformLeft = '';
        if (textLeft + pickerWidth < window.innerWidth) {
          transformLeft = `${textLeft + scrollX}px`;
        } else {
          transformLeft = `${textRight - pickerWidth + scrollX}px`;
        }

        let transformTop = '';
        if (textBottom + pickerHeight < window.innerHeight) {
          transformTop = `${textBottom + scrollY}px`;
        } else {
          transformTop = `${textTop - pickerHeight + scrollY}px`;
        }

        pickerRef.value.style.transform = `translate(${transformLeft}, ${transformTop})`;
      }
    };

    onMounted(() => {
      // resize 响应式 colorpicker
      window.addEventListener('resize', resize);
      // 点击展示 colorpicker
      window.addEventListener('click', isExhibition, true);
      window.addEventListener('scroll', updatePickerPosition, false);
    });
    onBeforeUnmount(() => {
      // resize 响应式 colorpicker
      window.removeEventListener('resize', resize);
      // 点击展示 colorpicker
      window.removeEventListener('click', isExhibition, true);
      window.removeEventListener('scroll', updatePickerPosition, false);
    });
    // ** computeds
    // colorpicker panel 组件位置
    const colorPickerPostion = computed<StyleValue>(() => {
      if (colorCubeRef.value) {
        return {
          transform: `translate(${left.value}px, ${top.value}px)`,
        };
      }
      return {};
    });
    // 交互触发item 颜色 面板  动态修改alpha后要还原 alpha 2021.12.18
    const tiggerColor = computed(() => {
      const currentColor = (initialColor.value as ColorPickerColor).rgba;
      const trigger = { ...currentColor, a: props.showAlpha ? currentColor.a : 1 };
      return {
        backgroundColor: `${RGBAtoCSS(trigger)}`,
      };
    });
    // 交互面板 的value 值 动态展示 根据不同 type
    const formItemValue = computed(() => {
      return extractColor(initialColor.value as ColorPickerColor, '', formItemText.value, props.showAlpha);
    });
    // 动态 根据当前 透明度修改文本颜色 tips：根据不同 面板颜色 目前 不够优雅
    const textColor = computed(() => {
      // 数字代表 hsv 中的value 值 纵轴 动态切换 文本颜色
      return changeColorValue(initialColor.value as ColorPickerColor, 0.5);
    });
    // ** emits
    // 动态 交互面板 文本展示颜色  tips：根据不同 面板颜色 目前 不够优雅
    function changeTextColor(value: boolean): void {
      isChangeTextColor.value = value;
    }

    // 阻止冒泡事件，用于popover下带有colorPicker导致的点击关闭popover面板问题
    function clickColorPanel(e: event) {
      e.stopPropagation();
    }
    // 通过修改画板 颜色 修改 v-model 颜色
    function changePaletteColor(colorMap: ColorPickerColor): void {
      updateUserColor(colorMap, true);
    }
    // 通过用户点击触发修改 交互面板 文本类型
    function changeTextModeType(type: string): void {
      mode.value = type;
      formItemText.value = type;
    }

    // 初始化的时候 确定 colopicker位置  由于 pickerref 默认 为 undefined 所以监听 showcolorpicker
    watch(
      () => showColorPicker.value,
      (newValue) => {
        newValue &&
          nextTick(() => {
            updatePickerPosition();
          });
      }
    );
    // 监听用户输入 2021.12.10
    watch(
      () => props.modelValue,
      (newValue) => {
        // 全部转换成对象
        updateUserColor(parseColor(newValue, initialColor.value));
      },
      { immediate: true }
    );

    return () => {
      return (
        <div class="nancalui-color-picker" ref={colorCubeRef}>
          {slots.default ? (
            slots.default({ color: tiggerColor.value.backgroundColor, formattedColor: formItemValue.value, textColor: textColor.value })
          ) : (
            <div class="nancalui-color-picker-container">
              <div class="nancalui-color-picker-container-wrap">
                <div class="nancalui-color-picker-container-wrap-current-color" style={tiggerColor.value}></div>
                <div
                  class={[
                    'nancalui-color-picker-container-wrap-transparent',
                    'nancalui-color-picker-container-wrap-current-color-transparent',
                  ]}></div>
                {/* <div class="nancalui-color-picker-color-value">
                  <p style={textColor.value as StyleValue}>{formItemValue.value}</p>
                </div> */}
              </div>
            </div>
          )}

          <Teleport to="body">
            <Transition name="color-picker-transition">
              {showColorPicker.value ? (
                <div ref={pickerRef} style={colorPickerPostion.value} class={['nancalui-color-picker-position']} onClick={clickColorPanel}>
                  <color-panel
                    v-model={initialColor.value}
                    ref={containerRef}
                    mode={mode.value}
                    onChangeTextColor={changeTextColor}
                    onChangePaletteColor={changePaletteColor}
                    onChangeTextModeType={changeTextModeType}></color-panel>
                </div>
              ) : null}
            </Transition>
          </Teleport>
        </div>
      );
    };
  },
});
