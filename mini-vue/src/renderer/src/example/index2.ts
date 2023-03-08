const vnode1 = {
  type: 'p',
  children: 'text',
  props: {
    onClick: [
      () => {
        alert('clicked')
      },
      () => {
        alert('clicked again')
      },
    ],
    onContextmenu: () => {
      alert('contextmenu')
    },
  },
}