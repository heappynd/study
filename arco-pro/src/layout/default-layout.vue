<template>
  <a-layout class="layout">
    <a-layout-header class="layout-navbar">
      <div class="navbar">header</div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider theme="light" class="layout-sider">
        <div class="menu-wrapper">
          <Menu />
        </div>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <PageLayout />
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="layout-footer">Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import Menu from "@/components/menu/index.vue";
import PageLayout from './page-layout.vue';
</script>

<style lang="scss" scoped>
$nav-size-height: 60px;
$layout-max-width: 1100px;

.layout {
  height: 100vh;
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
</style>
