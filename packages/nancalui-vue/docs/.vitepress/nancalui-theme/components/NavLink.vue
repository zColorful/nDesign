<script setup lang="ts">
import { toRefs } from 'vue';
import type { DefaultTheme } from '../config';
import { useNavLink } from '../composables/navLink';
import OutboundLink from './icons/OutboundLink.vue';

const props = defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const propsRefs = toRefs(props);

const { props: linkProps, isExternal } = useNavLink(propsRefs.item);
</script>

<template>
  <div class="nav-link">
    <a class="item" v-bind="linkProps"> {{ item.text }} <OutboundLink v-if="isExternal" /> </a>
  </div>
</template>

<style scoped lang="scss">
@import '@nancalui/styles-var/nancalui-var';

.item {
  display: block;
  padding: 0 1.5rem;
  line-height: 36px;
  font-size: 1rem !important;
  font-weight: 600;
  color: $nancalui-text;
  white-space: nowrap;
}

.item:hover,
.item.active {
  text-decoration: none;
  color: $nancalui-brand;
}

.item.external:hover {
  border-bottom-color: transparent;
  color: $nancalui-text;
}

@media (min-width: 720px) {
  .item {
    border-bottom: 3px solid transparent;
    padding: 15px 0;
    line-height: 24px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .item:hover,
  .item.active {
    border-bottom-color: $nancalui-brand;
    color: $nancalui-text;
  }
}
</style>
