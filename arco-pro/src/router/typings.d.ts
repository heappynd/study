import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /**
     * 配置能访问该页面的角色，如果不匹配，则会被禁止访问该路由页面
     */
    roles?: string[];
    /**
     * 是否需要登录鉴权
     */
    requiresAuth: boolean;
    /**
     * 菜单配置icon
     */
    icon?: string; // The icon show in the side menu
    /**
     * 一级菜单名（语言包键名）
     */
    locale?: string; // The locale name show in side menu and breadcrumb
    /**
     * 是否在左侧菜单中隐藏该项
     */
    hideInMenu?: boolean; // If true, it is not displayed in the side menu
    /**
     * 强制在左侧菜单中显示单项
     */
    hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
    /**
     * 高亮设置的菜单项
     */
    activeMenu?: string; // if set name, the menu will be highlighted according to the name you set
    /**
     * 排序路由菜单项。如果设置该值，值越高，越靠前
     */
    order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
    /**
     * 如果设置为true，标签将不会添加到tab-bar中
     */
    noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
    /**
     * 如果设置为true页面将不会被缓存
     */
    ignoreCache?: boolean; // if set true, the page will not be cached
  }
}
