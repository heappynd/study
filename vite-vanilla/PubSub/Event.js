const Event = (() => {
  const clientList = []

  function listen(key, fn) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    clientList[key].push(fn)
  }

  function trigger(key, ...args) {
    const fns = clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args)
    }
  }

  function remove(key, fn) {
    const fns = clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let l = fns.length - 1; l >= 0; l--) {
        const _fn = fns[l]
        if (_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }

  return {
    listen,
    trigger,
    remove,
  }
})()

Event.listen('100', (price) => {
  console.log('100', price)
})
Event.trigger('100', 888)
