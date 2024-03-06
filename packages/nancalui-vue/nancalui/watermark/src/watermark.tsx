import { computed, defineComponent, onBeforeUnmount, onMounted, ref, StyleValue, toRefs, watch } from 'vue';
import type { SetupContext } from 'vue';
import { BaseSize, FontGap, NumEum2, ReturnSize, watermarkProps, WatermarkProps } from './watermark-types';
import './watermark.scss';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { getPixelRatio, getStyleStr, reRendering, rotateWatermark } from './utils';
import { isString, isUndefined } from 'lodash';

export default defineComponent({
  name: 'NWatermark',
  props: watermarkProps,
  emits: [],
  setup(props: WatermarkProps, ctx: SetupContext) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    // console.log(data.value);
    const n = useNamespace('watermark');
    const containerRef = ref<HTMLDivElement | null>(null);
    let watermarkRef: HTMLDivElement | null = null;
    const stopObservation = ref<boolean>(false);
    const { slots } = ctx;

    const { show, zIndex, rotate, width, height, image, imageRight, content, font, gap, offset, opacity, imageSize } = toRefs(props);
    const backgroundImage = ref<string>('');
    const backgroundSize = ref<string>('');

    const markStyle = computed(() => {
      const style: StyleValue = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
      };
      const [gapX, gapY] = gap.value;
      const gapXCenter = gapX / 2;
      const gapYCenter = gapY / 2;
      const offsetLeft = offset?.value?.[0] ?? gapXCenter;
      const offsetTop = offset?.value?.[1] ?? gapYCenter;

      /** Calculate the style of the offset */
      let positionLeft = offsetLeft - gapXCenter;
      let positionTop = offsetTop - gapYCenter;
      if (positionLeft > 0) {
        style.left = `${positionLeft}px`;
        style.width = `calc(100% - ${positionLeft}px)`;
        positionLeft = 0;
      }
      if (positionTop > 0) {
        style.top = `${positionTop}px`;
        style.height = `calc(100% - ${positionTop}px)`;
        positionTop = 0;
      }
      style.backgroundPosition = `${positionLeft}px ${positionTop}px`;
      style.backgroundImage = backgroundImage.value;
      style.backgroundSize = backgroundSize.value;
      style.zIndex = zIndex.value;
      style.opacity = opacity.value;

      return style;
    });

    const destroyWatermark = () => {
      if (watermarkRef) {
        watermarkRef.remove();
        watermarkRef = null;
      }
    };

    const appendWatermark = () => {
      if (!watermarkRef) {
        watermarkRef = document.createElement('div');
      }
      containerRef.value?.append(watermarkRef);
    };

    const updateMarkStyle = () => {
      stopObservation.value = true;
      watermarkRef?.setAttribute('style', getStyleStr(markStyle.value));
      setTimeout(() => {
        stopObservation.value = false;
      });
    };

    const changeBackground = (base64Url: string, markWidth: number) => {
      const [gapX] = gap.value;
      backgroundImage.value = `url('${base64Url}')`;
      backgroundSize.value = `${(gapX + markWidth) * BaseSize}px`;
    };

    const loadImg = (img: HTMLImageElement, src: string) => {
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.src = src;

      return new Promise<void>((res, rej) => {
        img.onload = () => {
          res();
        };

        img.onerror = () => {
          rej();
        };
      });
    };

    const parsePercent = (str: string): number => {
      if (!str.endsWith('%')) {
        return 1;
      }
      const num = str.replace('%', '');
      let res = 1;
      try {
        res = Number(num) * 0.01;
      } catch (e) {
        console.error(e);
      }

      return res;
    };

    /**
     * Get the width and height of the watermark. The default values are as follows
     * Image: [120, 64]; Content: It's calculated by content;
     */
    const getMarkSize = async (ctx2d: CanvasRenderingContext2D): Promise<ReturnSize> => {
      let totalWidth = 0;
      let totalHeight = 0;
      let img: HTMLImageElement | undefined;
      let imgWidth = 0;
      let imgHeight = 0;
      let contentWidth = 0;
      let contentHeight = 0;

      //  计算文字大小
      if (ctx2d.measureText && content?.value) {
        const { color = '#999', fontSize = 16, fontWeight = 'normal', fontStyle = 'normal', fontFamily = 'sans-serif' } = font.value;
        ctx2d.font = `${Number(fontSize)}px ${fontFamily}`;
        const contents = (Array.isArray(content?.value) ? content?.value : [content?.value]) as string[];
        const sizes = contents.map((item) => ctx2d.measureText(item));
        contentWidth = Math.ceil(Math.max(...sizes.map((size) => size.width)));
        contentHeight = Number(fontSize) * contents.length + (contents.length - 1) * FontGap;
      }

      //  使用图片计算大小
      if (image?.value) {
        img = new Image();
        //  加载图片失败，就放弃此次
        try {
          await loadImg(img, image.value);
          const { width: w, height: h } = img;
          //  用于优化图片变形 //  如果没有设置，那使用文字高度作为图片高度
          let { width: configWidth, height: configHeight } = imageSize?.value ?? { height: contentHeight };
          //  处理百分比宽高
          if (isString(configWidth)) {
            configWidth = parsePercent(configWidth) * w;
          }
          if (isString(configHeight)) {
            configHeight = parsePercent(configHeight) * h;
          }

          //  计算原图比例
          const widthFactor = configWidth && w ? configWidth / w : undefined;
          const heightFactor = configHeight && h ? configHeight / h : undefined;

          //  按比例给宽高
          if (widthFactor || heightFactor) {
            imgWidth = widthFactor ? (configWidth as number) : w * (heightFactor as number);
            imgHeight = heightFactor ? (configHeight as number) : h * (widthFactor as number);
          } else {
            //  如果没有获取到图片的宽高，就设置为默认的
            imgWidth = w || 60;
            imgHeight = h || 60;
          }
          //  去除小数
          imgWidth = Math.ceil(imgWidth);
          imgHeight = Math.ceil(imgHeight);
        } catch (e) {
          img = undefined;
        }
      }

      //  如果有图片，宽度 = 图片 + 间隙 + 文字
      if (img) {
        totalWidth = imgWidth + contentWidth + imageRight.value;
      } else {
        totalWidth = contentWidth;
      }
      totalHeight = Math.max(contentHeight, imgHeight);
      //  如果有旋转，旋转会的高度
      const theta = (Math.PI / 180) * rotate.value;
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);

      const rotateHeight = Math.abs(totalWidth * sin) + Math.abs(totalHeight * cos);
      totalHeight = Math.ceil(rotateHeight);

      return {
        w: width?.value ?? totalWidth,
        h: height?.value ?? totalHeight,
        img,
        imgWidth,
        imgHeight,
        right: imageRight.value,
        contentWidth,
        contentHeight,
      };
    };

    const fillTexts = (ctx2d: CanvasRenderingContext2D, drawX: number, drawY: number, drawWidth: number, drawHeight: number) => {
      const ratio = getPixelRatio();
      const { color = '#999', fontSize = 16, fontWeight = 'normal', fontStyle = 'normal', fontFamily = 'sans-serif' } = font.value;
      const mergedFontSize = Number(fontSize) * ratio;
      ctx2d.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`;
      ctx2d.fillStyle = color;
      ctx2d.textAlign = 'center';
      ctx2d.textBaseline = 'top';
      ctx2d.translate(drawWidth * 0.5, 0);
      const contents = (Array.isArray(content?.value) ? content?.value : [content?.value]) as string[];
      contents?.forEach((item, index) => {
        ctx2d.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio));
      });
    };

    const renderWatermark = async () => {
      const canvas = document.createElement('canvas');

      const ctx2d = canvas.getContext('2d') as CanvasRenderingContext2D;
      const [gapX, gapY] = gap.value;

      if (ctx2d) {
        const ratio = getPixelRatio();
        const { w: markWidth, h: markHeight, img, imgWidth, imgHeight, right, contentWidth, contentHeight } = await getMarkSize(ctx2d);
        //  实际canvas绘制长宽
        const canvasWidth = (gapX + markWidth) * ratio;
        const canvasHeight = (gapY + markHeight) * ratio;
        canvas.setAttribute('width', `${canvasWidth * BaseSize}px`);
        canvas.setAttribute('height', `${canvasHeight * BaseSize}px`);

        //  实际绘制图片大小
        const drawImageWidth = imgWidth * ratio;
        const drawImageHeight = imgHeight * ratio;
        //  左边上边距离
        const drawX = gapX * ratio * 0.5;
        const drawY = gapY * ratio * 0.5;
        // 实际绘制文字大小
        const drawTextWidth = contentWidth * ratio;
        const drawTextHeight = contentHeight * ratio;
        //  计算旋转中心
        const rotateX = canvasWidth * 0.5;
        const rotateY = canvasHeight * 0.5;
        /** Alternate drawing parameters */
        const alternateDrawX = drawX + canvasWidth;
        const alternateDrawY = drawY + canvasHeight;
        const alternateRotateX = rotateX + canvasWidth;
        const alternateRotateY = rotateY + canvasHeight;

        const margin = right * ratio;

        ctx2d.save();
        rotateWatermark(ctx2d, rotateX, rotateY, rotate.value);

        if (img) {
          ctx2d.drawImage(img, drawX, (canvasHeight - drawImageHeight) * 0.5, drawImageWidth, drawImageHeight);
          content?.value &&
            fillTexts(ctx2d, drawX + drawImageWidth + margin, (canvasHeight - drawTextHeight) * 0.5, drawTextWidth, drawTextHeight);

          /** Draw interleaved pictures after rotation */
          ctx2d.restore();
          rotateWatermark(ctx2d, alternateRotateX, alternateRotateY, rotate.value);
          ctx2d.drawImage(img, alternateDrawX, (canvasHeight - drawImageHeight) * 0.5 + canvasHeight, drawImageWidth, drawImageHeight);
          fillTexts(
            ctx2d,
            alternateDrawX + drawImageWidth + margin,
            (canvasHeight - drawTextHeight) * 0.5 + canvasHeight,
            drawTextWidth,
            drawTextHeight
          );
        } else if (content?.value) {
          fillTexts(ctx2d, drawX + drawImageWidth + margin, (canvasHeight - drawTextHeight) * 0.5, drawTextWidth, drawTextHeight);
          /** Draw interleaved pictures after rotation */
          ctx2d.restore();
          rotateWatermark(ctx2d, alternateRotateX, alternateRotateY, rotate.value);
          fillTexts(ctx2d, alternateDrawX, (canvasHeight - drawTextHeight) * 0.5 + canvasHeight, drawTextWidth, drawTextHeight);
        }

        changeBackground(canvas.toDataURL(), markWidth);
        updateMarkStyle();
      }
      canvas.remove();
    };

    let observer: MutationObserver | undefined;
    onMounted(() => {
      if (show.value) {
        appendWatermark();
      }

      if (window.MutationObserver) {
        observer = new MutationObserver((mutations) => {
          if (stopObservation.value) {
            return;
          }
          mutations.forEach((mutation) => {
            if (reRendering(mutation, watermarkRef as HTMLDivElement)) {
              destroyWatermark();
              appendWatermark();
              renderWatermark();
            }
          });
        });
        containerRef.value &&
          observer.observe(containerRef.value, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
          });
      }
    });

    watch(
      markStyle,
      () => {
        updateMarkStyle();
      },
      {
        immediate: true,
      }
    );

    watch(
      () => [rotate, width, height, image, imageSize, imageRight, content, font, gap],
      () => {
        renderWatermark();
      },
      {
        immediate: true,
        deep: true,
      }
    );

    watch(
      show,
      (val) => {
        if (val) {
          appendWatermark();
          renderWatermark();
        } else {
          destroyWatermark();
        }
      },
      {
        immediate: true,
      }
    );

    onBeforeUnmount(() => {
      observer?.disconnect();
      destroyWatermark();
    });

    return () => (
      <div class={n.b()} ref={containerRef} style={{ position: 'relative' }}>
        {slots.default?.()}
      </div>
    );
  },
});
