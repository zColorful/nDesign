<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToc } from '../composables/useToc';
import { useActiveSidebarLinks } from '../composables/activeBar';
import { CURRENT_LANG, ZH_CN } from '../const';

const headers = useToc();
const marker = ref();
const container = ref();
// 滚动监听
useActiveSidebarLinks(container, marker);
const forwardText = computed(() => {
  return CURRENT_LANG === ZH_CN ? '快速前往' : 'Forward';
});
</script>

<template>
  <aside ref="container" v-if="headers?.length > 0">
    <nav class="nancalui-content-nav">
      <h3 class="nancalui-fast-forward">{{ forwardText }}</h3>
      <ul class="nancalui-step-nav">
        <li v-for="{ link, text } in headers" :key="link" class="nancalui-item">
          <a class="nancalui-link" :href="link" :title="text">{{ text }}</a>
        </li>
      </ul>
      <div ref="marker" class="nancalui-marker"></div>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
@import '@nancalui/styles-var/nancalui-var';

//内容区导航样式
.nancalui-content-nav {
  width: 200px;
  position: fixed;
  top: 50px;
  right: calc((100vw - 1440px) / 2 - 10px);
  z-index: 1;

  .nancalui-fast-forward {
    width: 130px;
    font-size: $nancalui-font-size-card-title;
    color: $nancalui-text;
    line-height: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    margin-left: 17px;
  }

  .nancalui-step-nav {
    overflow-y: hidden;
    height: calc(100vh - 182px);
    margin-top: 10px;
    padding-bottom: 20px;

    &:hover {
      overflow-y: auto;
    }

    & > li {
      list-style: none;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      font-size: $nancalui-font-size;
      color: $nancalui-text;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      a {
        display: block;
        overflow: hidden;
        color: $nancalui-text;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }
      a.current {
        color: $nancalui-link;
      }
    }
  }

  .nancalui-link:hover,
  .nancalui-link.active {
    color: $nancalui-brand;
    text-decoration: none;
  }
}

@media (max-width: 1800px) {
  .nancalui-content-nav {
    width: 150px;
  }

  .nancalui-content-layout {
    padding: 0 15% 0 8%;
  }
}

@media (max-width: 1250px) {
  .nancalui-content-nav {
    display: none;
  }
}

@media (max-width: 1024px) {
  .nancalui-content-layout {
    width: 100%;
    margin-left: 0;
    transition: all 0.2s ease-out;
  }
}
</style>
