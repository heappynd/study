<script lang="ts" setup>
import { ref } from "vue";
import useMenuTree from "./use-menu-tree";
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";
import SubMenu from "./SubMenu.vue";
import { listenerRouteChange } from "@/utils/route-listener";

const router = useRouter();
const route = useRoute();
const { menuTree } = useMenuTree();

const collapsed = ref(false);
const openKeys = ref<string[]>([]);
const selectedKey = ref<string[]>([]);

const onUpdate = (key: string[]) => {
  console.log("key", key);
  selectedKey.value = key;
};

const findMenuOpenKeys = (target: string) => {
  const result: string[] = [];
  let isFind = false;
  const backtrack = (item: RouteRecordRaw, keys: string[]) => {
    if (item.name === target) {
      isFind = true;
      result.push(...keys);
      return;
    }
    if (item.children?.length) {
      item.children.forEach((el) => {
        backtrack(el, [...keys, el.name as string]);
      });
    }
  };
  menuTree?.forEach((el: RouteRecordRaw) => {
    if (isFind) return; // Performance optimization
    backtrack(el, [el.name as string]);
  });
  return result;
};
listenerRouteChange((newRoute) => {
  console.log("newRoute", newRoute);
  const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
  if (requiresAuth && (!hideInMenu || activeMenu)) {
    const menuOpenKeys = findMenuOpenKeys(
      (activeMenu || newRoute.name) as string
    );

    const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
    openKeys.value = [...keySet];

    selectedKey.value = [activeMenu || menuOpenKeys[menuOpenKeys.length - 1]];
  }
}, true);
</script>

<template>
  <a-menu
    :style="{ width: '100%', height: '100%' }"
    mode="vertical"
    level-indent="34"
    theme="light"
    v-model:collapsed="collapsed"
    v-model:open-keys="openKeys"
    :selected-keys="selectedKey"
    :show-collapse-button="false"
    auto-open-selected
    @collapse="() => {}"
  >
    <SubMenu :routes="menuTree" @update="onUpdate" />
  </a-menu>
</template>
