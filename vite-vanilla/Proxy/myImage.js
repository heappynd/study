const myImage = (() => {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  imgNode.alt = 'my image'
  imgNode.style.border = '1px solid black'

  return {
    setSrc: (src) => {
      imgNode.src = src
    },
  }
})()

const proxyImage = (() => {
  const img = new Image()
  img.onload = function () {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: (src) => {
      myImage.setSrc('/bar.svg')
      img.src = src
    },
  }
})()

proxyImage.setSrc(
  'https://images.unsplash.com/photo-1671545564344-3a09344a4aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
)
