Events bubble by default. So the difference between the two is:

- target is the element that triggered the event (e.g., the user clicked on)
- currentTarget is the element that the event listener is attached to.

## 自定义传参

1.

```
onClick={this.ok.bind(this, 'foo')}

ok(foo, event) {
  event.preventDefault()
}
```

2.

```
onClick={(event) => this.ok('foo', event)}

ok = (foo, event) => {
  event.preventDefault()
}
```
