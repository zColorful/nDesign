<script setup lang="ts">
import { withBase, useData, useRouter } from 'vitepress';
const { site, theme, localePath } = useData();
const router = useRouter();

function gopage() {
  router.go('/nc-data/');
  return false;
}
</script>

<template>
  <a class="nav-bar-title" :aria-label="`${site.title}, back to home`" @click="gopage()">
    <img v-if="theme.logo" class="logo" :src="withBase(theme.logo)" alt="Logo" />
    <span>{{ site.title }}</span>
  </a>
</template>

<style scoped lang="scss">
@import '@nancalui/styles-var/nancalui-var';

.nav-bar-title {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  color: $nancalui-text;
  span {
    font-weight: bold;

    @media screen and (max-width: 360px) {
      display: none;
    }
  }

  .logo {
    margin-right: 10px;
    height: 39px;
    vertical-align: bottom;
  }
}

.nav-bar-title:hover {
  text-decoration: none;
  cursor: pointer;
}
</style>
