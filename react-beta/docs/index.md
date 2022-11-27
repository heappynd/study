1. {...props}

2. props.children

3. null undefined false -> 不返回任何内容

4. boolean && <div></div>

5. <Fragment key={}>

6. 纯函数

7. createRoot(document.getElementById('root')).render(<App />)
8. React waits until all code in the event handlers has run before processing your state updates.

9. setCount(n=>n+1)

- React queues this function to be processed after all the other code in the event handler has run.
- During the next render, React goes through the queue and gives you the final updated state.
