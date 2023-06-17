<template>
  <template v-for="item in routes">
    <a-sub-menu v-if="item.children && item.children.length" :key="item.name">
      <template v-if="item.meta?.icon" #icon>
        <component :is="item.meta.icon" />
      </template>
      <template #title>{{ item.meta?.locale }}</template>
      <SubMenu :routes="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.name" @click="goto(item)">
      {{ item.meta?.locale }}
    </a-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { openWindow, regexUrl } from "@/utils";
import {
  useRoute,
  useRouter,
  type RouteMeta,
  type RouteRecordRaw,
} from "vue-router";

defineOptions({
  name: "SubMenu",
});

interface IProps {
  routes: RouteRecordRaw[];
}

defineProps<IProps>();

const emit = defineEmits<{
  // (e: "update:selectedKey", value: string[]): void;
  update: [value: string[]];
}>();

const router = useRouter();
const route = useRoute();

const goto = (item: RouteRecordRaw) => {
  console.log("goto");
  // Open external link
  if (regexUrl.test(item.path)) {
    openWindow(item.path);
    // selectedKey.value = [item.name as string];
    emit("update", [item.name as string]);
    return;
  }
  // Eliminate external link side effects
  const { hideInMenu, activeMenu } = item.meta as RouteMeta;
  if (route.name === item.name && !hideInMenu && !activeMenu) {
    // selectedKey.value = [item.name as string];
    emit("update", [item.name as string]);
    return;
  }
  // Trigger router change
  router.push({
    name: item.name,
  });
};
</script>
