// import babelParser from "@babel/eslint-parser";
import jsdoc from "eslint-plugin-jsdoc";
import markdown from "eslint-plugin-markdown";

// console.log(jsdoc.configs.recommended);

export default [
  // 你可以直接通过在 eslint.config.js 配置数组中添加配置来使用包含在插件中的配置。
  // 通常，你会使用插件的推荐配置。
  // jsdoc.configs.recommended,
  {
    files: ["src/**/*.js"],
    // 这里，配置对象排除了以 .config.js 结尾的文件，除了 eslint.config.js。该文件仍将应用 semi。
    ignores: ["**/*.config.js", "!**/eslint.config.js"],

    languageOptions: {
      // 对于每个全局变量的键，设置相应的值等于 "writable" 以允许变量被覆盖，或 "readonly" 不允许覆盖。
      globals: {
        MY_CUSTOM_GLOBAL: "readonly",
        // 可以用字符串 "off" 来禁用全局变量
        Promise: "off",
      },
      // ecmaVersion 默认值为 "latest"
      // 可以设置为版本号（6）、年份（2022）或 "latest"
      // 要配置 ESLint 用来评估你的 JavaScript（ECMAScript）的版本
      ecmaVersion: "latest",
      // 这个属性可以被设置为 "module"、"commonjs" 或 "script"。
      // 默认情况下，.js 和 .mjs 文件的 sourceType 是 "module"，而 .cjs 文件则是 "commonjs"。
      // sourceType: "script",
      // 在许多情况下，你可以使用 ESLint 提供的默认解析器来解析你的 JavaScript 代码。
      // 你可以通过使用 parser 属性来覆盖默认的解析器。
      // parse: babelParser,
      // 你也可以通过使用 parserOptions 属性直接向自定义解析器传递选项
      // parserOptions: {
      //   requireConfigFile: false,
      //   babelOptions: {
      //     babelrc: false,
      //     configFile: false,
      //     // your babel options
      //     presets: ["@babel/preset-env"],
      //   },
      // },
    },
    linterOptions: {
      // 内联配置是通过 /*eslint*/ 注释实现的，例如 /*eslint semi: error*/
      noInlineConfig: true,
      // 启用这些未用的禁用指令的报告
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      jsdoc,
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "jsdoc/require-description": "warn",
    },
  },
  {
    files: ["**/*.md"],
    // 处理器允许 ESLint 将文本转化为 ESLint 可以检查的代码片段
    // 通过定义一个 processor 属性来指定某个文件类型所使用的处理器，
    // 该属性需要包括形如 "pluginName/processorName" 的处理器名称，
    // 以引用插件中的处理器，或是包括使用 preprocess() 和 postprocess() 方法的对象。
    // 例如，想要从 Markdown 文件中提取 JavaScript 代码块，
    plugins: {
      markdown,
    },
    processor: "markdown/markdown",
    settings: {
      sharedData: "Hello",
    },
  },
  // applies only to code blocks
  {
    files: ["**/*.md/*.js"],
    rules: {
      strict: "off",
    },
  },
];
