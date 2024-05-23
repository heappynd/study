```js
const oldVnode = {
  type: 'div',
  children: [
    { type: 'p', children: '1' },
    { type: 'p', children: '2' },
    { type: 'p', children: '3' },
  ],
}
const newVnode = {
  type: 'div',
  children: [
    { type: 'p', children: '4' },
    { type: 'p', children: '5' },
    // { type: 'p', children: '6' },
    // { type: 'p', children: '7' },
  ],
}
```

```js
const oldVnode = {
  type: 'div',
  children: [
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
    { type: 'p', children: '3', key: 3 },
  ],
}

const newVnode = {
  type: 'div',
  children: [
    { type: 'p', children: '3', key: 3 },
    { type: 'p', children: '1', key: 1 },
    { type: 'p', children: '2', key: 2 },
  ],
}
```
