# flushSync

```ts
// 这将指示 React 当封装在 flushSync 中的代码执行后，立即同步更新 DOM。
// 因此，当你尝试滚动到最后一个待办事项时，它已经在 DOM 中了：
flushSync(() => {
  setTodos([...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```

# forwardRef

# useSyncExternalStore

例如，像 `location.pathname` 这样的可变值不能作为依赖项。它是可变的，因此可以在 React 渲染数据流之外的任何时间发生变化。更改它不会触发组件的重新渲染。因此，即使你在依赖项中指定了它，React 也无法知道在其更改时重新同步 Effect。这也违反了 React 的规则，因为在渲染过程中读取可变数据（即在计算依赖项时）会破坏 纯粹的渲染。

相反，你应该使用 `useSyncExternalStore` 来读取和订阅外部可变值。

# useEffectEvent

你需要一个将这个非响应式逻辑和周围响应式 Effect 隔离开来的方法。

使用 useEffectEvent 这个特殊的 Hook 从 Effect 中提取非响应式逻辑：

这里的 onConnected 被称为 Effect Event。它是 Effect 逻辑的一部分，但是其行为更像事件处理函数。它内部的逻辑不是响应式的，而且能一直“看见”最新的 props 和 state。

```ts
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 声明所有依赖项
}
```
