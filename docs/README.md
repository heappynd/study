# study

1. 对象的内部方法和内部槽
2. 常规对象和异质对象
3. `in` 操作符的读取如何拦截

## 0704

1. electron 进程间通信

## 0705

1. docker 容器数据卷

## 0706

1. docker 安装常用软件

## 0710

1. 理解 Proxy 与 Reflect

## 0711

1. git rebase -i --root
2. git push -f

## 0718

1. [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)

## 0726

1. 规范 GIT 代码提交信息
   - https://jelly.jd.com/article/5f51aa34da524a0147e9529d
   - https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

## 0729

1. [单文件组件 CSS 功能](https://staging-cn.vuejs.org/api/sfc-css-features.html)
2. [深度作用选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#深度作用选择器)

## 1205

1. CSS3 :where

```css
:where(section, div) {
  border: 1px solid #000;
}

/* 优先级为0 第一位元素选择器 第二位类选择器 第三位ID选择器 */
p :where(.link, .btn) {
  color: blue;
}
/* is取的优先级是参数里面最高的 */
p :is(.link, .btn) {
  color: blue;
}
/* 0,2,0 人为提高优先级 */
.link.link {
  position: relative;
  color: aqua;
}

p .link,
p .btn {
  position: relative;
}
/* 对于以后想要覆盖的样式优先选择where */
```

#1206

1. [乐观更新与保守更新](https://www.jianshu.com/p/154ca94f5209)
