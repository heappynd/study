类似 v-html

```tsx
function App() {
  const rawHTML = `<span style="color: blue;">rawHTML</span>`

  return (
    <div className="App">
      <h2 dangerouslySetInnerHTML={{ __html: rawHTML }}></h2>
      <h2>{rawHTML}</h2>
    </div>
  )
}
```
