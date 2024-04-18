import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun("sub-c", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 7300,
    cors: true,
  },
  // 生产环境需要指定运行域名作为base
  // base: "http://xxx.com/",
  base: '/'
});
