// const result = import.meta.url

// console.log(import.meta)

// console.log('result', result)

// console.log(new URL('./assets/1.svg', import.meta.url))

function getImageUrl(name) {
  return new URL(`./assets/${name}`, import.meta.url).href
}

console.log(getImageUrl('2.png'))
