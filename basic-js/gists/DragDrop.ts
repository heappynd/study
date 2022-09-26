const ps = document.querySelectorAll('p')

ps[0].addEventListener('dragstart', (e) => {
  console.log('p1 dragstart')
  // const img = document.createElement('img')
  // e.dataTransfer?.setDragImage(img, 100, 100)

  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
    e.dataTransfer.setData('text/plain', (e.target as HTMLElement)?.id)
  }
})
ps[0].addEventListener('dragend', (e) => {
  console.log('p1 dragend')
})

// droppable
ps[1].addEventListener('dragover', (e) => {
  e.preventDefault()
  console.log('p2 dragover')
})
ps[1].addEventListener('drop', (e) => {
  e.preventDefault()
  console.log('p2 drop')
  if (e.dataTransfer) {
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      const item = e.dataTransfer.items[i]
      const file = item.getAsFile()
      console.log(file)
    }

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i]
      console.log(file.name)
    }
  }
})
