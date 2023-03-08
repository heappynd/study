import { normalizeClass } from '../utils'

const vnode1 = {
  type: 'h1',
  // 使用 props 描述一个元素的属性
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: 'hello',
      props: {
        class: normalizeClass('foo bar'),
      },
    },
    {
      type: 'button',
      props: {
        disabled: '',
        class: normalizeClass({ foo: true, bar: false }),
      },
      children: 'click me',
    },
    {
      type: 'div',
      props: {
        class: normalizeClass(['foo bar', { baz: true }]),
      },
      children: 'div',
    },
  ],
}
