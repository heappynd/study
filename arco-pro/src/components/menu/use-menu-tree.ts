import appClientMenus from "@/router/app-menus";
import { cloneDeep } from "lodash-es";
import type { RouteRecordRaw } from "vue-router";

export default function useMenuTree() {
  const appRoute = appClientMenus;

  const menuTree = getMenuTree();

  function getMenuTree() {
    const copyRoute = cloneDeep(appRoute);
    copyRoute.sort((a, b) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });
    return travel(copyRoute, 0);
  }

  function travel(_routes: RouteRecordRaw[], layer: number) {
    if (!_routes) return;
    const collector = _routes.map((element) => {
      // no access
      // if (!permission.accessRouter(element)) {
      //   return null;
      // }
      // leaf node
      if (element.meta?.hideChildrenInMenu || !element.children) {
        element.children = [];
        return element;
      }
      // route filter hideInMenu true
      element.children = element.children.filter(
        (x) => x.meta?.hideInMenu !== true
      );
      // Associated child node
      const subItem = travel(element.children, layer + 1);
      if (subItem.length) {
        element.children = subItem;
        return element;
      }
      // the else logic
      if (layer > 1) {
        element.children = subItem;
        return element;
      }

      if (element.meta?.hideInMenu === false) {
        return element;
      }

      return null;
    });
    return collector.filter(Boolean);
  }

  return {
    menuTree,
  };
}
