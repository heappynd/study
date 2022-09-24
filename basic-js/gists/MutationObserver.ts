const list = document.getElementById('list') as HTMLUListElement

for (let i = 0; i < 5; i++) {
  const li = document.createElement('li')
  const text = document.createTextNode(`${i}`)
  li.appendChild(text)
  list.appendChild(li)
}

const text = document.createTextNode('text')
document.body.appendChild(text)

const observer = new MutationObserver((mutationRecords, mutationObserver) => {
  console.log('DOM was mutated!')
  console.log(mutationRecords)
  // console.log(mutationObserver === observer)
})

observer.observe(list, {
  characterDataOldValue: true,
  attributes: true,
  attributeOldValue: true,
  childList: true,
})

observer.observe(text, {
  characterDataOldValue: true,
})

// observer.takeRecords()
