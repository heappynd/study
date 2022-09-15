## 表单

- 受控组件 组件受`state`控制
- input textarea select 用 value
- checkbox radio 用 checked
- 非受控组件

label `for` -> `htmlFor`

## 父子组件通讯

- props 传属性、方法
- propTypes [propTypes](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)
- 状态提升

## setState

- 不可变值
- 可能是异步更新
- 可能会被合并

1. React 是函数式的设计思路，函数式编程：没有副作用，每次都返回新的值
2. `setState` 直接使用是异步的 在 setTimeout、自定义的 DOM 事件 里面是同步的
3. `setState` 在构造函数中定义 也可利用`public class fields syntax`
4. React 组件事件：异步更新 + 合并 state (批处理)
5. dom 事件，setTimeout：同步更 + 不合并 state (React 18 和上面一致 ✨Automatic Batching)

```tsx
this.setState(
  {
    count: this.state.count + 1,
  },
  () => {
    // vue nextTick
    console.log('cb', this.state.count)
  }
)
// 传入对象 会合并 类似 Object.assign()
// 传入函数 不会合并
this.setState(
  (prevState, props) => {
    return {
      count: prevState.count + 1,
    }
  },
  () => {
    console.log('cb', this.state.count)
  }
)
```
