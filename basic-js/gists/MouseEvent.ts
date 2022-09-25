const myDiv = document.getElementById('myDiv')!

const events: (keyof HTMLElementEventMap)[] = [
  'mousedown',
  'mouseup',
  'click',
  'dblclick',
]

events.forEach((event) => {
  myDiv.addEventListener(event, (e) => {
    e.preventDefault()
    console.log(e.type)
    console.log(e)
    console.log({
      shiftKey: (e as MouseEvent).shiftKey,
      metaKey: (e as MouseEvent).metaKey,
      ctrlKey: (e as MouseEvent).ctrlKey,
      altKey: (e as MouseEvent).altKey,
    })
  })
})
