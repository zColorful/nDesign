<script setup lang="ts">
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <footer v-if="frontmatter.footer" class="footer">
    <div class="container">
      <div class="footer-item">
        <div class="footer-item__title">社区</div>
        <ul>
          <li><a href="#" target="_blank">代码仓库</a></li>
          <li><a href="#" target="_blank">更新日志</a></li>
          <li><a href="#" target="_blank">反馈建议</a></li>
        </ul>
      </div>
      <div class="footer-item">
        <div class="footer-item__title">生态</div>
        <ul>
          <li><a href="#" target="_blank">Vue Nancal UI</a></li>
          <li><a href="#" target="_blank">NancalUI Icons</a></li>
        </ul>
      </div>
      <div class="footer-item">
        <div class="footer-item__title">友链</div>
        <ul>
          <li><a href="#" target="_blank">暂无</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import '@nancalui/styles-var/nancalui-var';

.footer {
  margin: 0 auto;
  max-width: 960px;
}

@media (min-width: 720px) {
  .footer {
    padding: 0 1.5rem;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem 1.5rem 2.25rem;

  .footer-item {
    margin-right: 20px;
    font-size: 14px;

    &:last-child {
      margin-right: 0;
    }

    ul {
      list-style: none;
      padding-left: 0;

      a {
        color: $nancalui-text;
        text-decoration: none;
        line-height: 28px;

        &:hover {
          color: $nancalui-brand;
        }
      }
    }

    &__title {
      font-size: 18px;
    }
  }
}

.home-hero + .footer .container,
.home-features + .footer .container,
.home-content + .footer .container {
  /* border-top: 1px solid var(--c-divider); */
}

@media (min-width: 420px) {
  .container {
    padding: 3rem 1.5rem 3.25rem;
  }
}

.text {
  margin: 0;
  text-align: center;
  line-height: 1.4;
  font-size: 0.9rem;
  color: $nancalui-text-weak;
}
</style>
