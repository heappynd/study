# error levels

```json
{
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

- 'off' or 0
- 'warn' or 1
- 'error' or 2

# recommended rules

```json
{
  "extends": "eslint:recommended"
}
```

# Conf

- env
- globals
- parser parserOptions
- plugins 继承另一个配置文件的所有特征（包括规则、插件和语言选项）并修改所有选项。
- settings 指定应该在其所有规则中共享的信息
- "root": true 它将停止在父文件夹中寻找

# extends

基础配置：被扩展的配置。
派生配置：扩展基础配置的配置。
结果的实际配置：将派生配置合并到基础配置的结果。

extends 属性值可以是：

- 一个指定配置的字符串。
- 一个指定配置的字符串（要么是配置文件的路径，要么是可共享配置的名称，要么是 eslint:recommended，要么是 eslint:all）。
- 一个字符串数组，每个额外的配置都会扩展前面的配置。

可以省略配置名称中的 eslint-config- 前缀。如 airbnb 会被解析为 eslint-config-airbnb。

# 可共享配置包

导出配置对象的一个 npm 包

插件是一个可以为 ESLint 添加各种扩展功能的 npm 包.
插件可以执行许多功能，包括但不限于添加新的规则和导出可共享的配置。
plugins 属性值可以省略包名中的 eslint-plugin- 前缀。

extends 属性值由以下内容组成：

- plugin:
- 包名（可以省略其前缀，如 react 是 eslint-plugin-react 的缩写）
- /
- 配置名称（如 recommended）

```json
{
  "plugins": ["react"],
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "rules": {
    "react/no-set-state": "off"
  }
}
```

extends 属性值可以是基于配置文件)的绝对或相对路径。

extends 属性值可以使用 "eslint:all" 来启用当前安装的 ESLint 版本中的所有核心规则。

v4.1.0+. 有时，更精细的配置是必要的，比如同一目录下的文件的配置不同。因此，你可以在 overrides 键下提供配置，这些配置只会用于符合特定 glob 模式的文件，且使用与你在命令行中传递的相同格式（如 app/\*_/_.test.js）。

```json
{
  "rules": {
    "quotes": ["error", "double"]
  },

  "overrides": [
    {
      "files": ["bin/*.js", "lib/*.js"],
      "excludedFiles": "*.test.js",
      "rules": {
        "quotes": ["error", "single"]
      }
    }
  ]
}
```
