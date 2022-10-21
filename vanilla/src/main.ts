;(() => {
  const idioms = ['诗情画意', '南来北往', '一团和气', '落花流水'],
    oCharCellGroup = document.querySelector('.char-cell-group')!

  let charCollection: string[] = [],
    oChars: NodeListOf<HTMLDivElement> | null = null,
    startX = 0,
    startY = 0,
    cellW = 0,
    cellH = 0,
    mouseX = 0, // 鼠标到元素边框距离
    mouseY = 0

  const init = () => {
    charCollection = formatCharsArr()
    console.log(charCollection)
    render()

    oChars = oCharCellGroup.querySelectorAll('.cell-item .wrapper')

    bindEvent()
  }

  function formatCharsArr() {
    let _arr: string[] = []

    idioms.forEach((item) => {
      _arr = _arr.concat(item.split(''))
    })

    return _arr.sort(randomSort)
  }

  function randomSort(a: string, b: string) {
    return Math.random() > 0.5 ? -1 : 1
  }

  function charCellTpl(char: string, index: number) {
    return `
      <div class="cell-item" data-index="${index}">
        <div class="wrapper">${char}</div>
      </div>`
  }

  function render() {
    let list = ''
    charCollection.forEach((char, index) => {
      list += charCellTpl(char, index)
    })
    oCharCellGroup.innerHTML = list
  }

  function bindEvent() {
    let oChar = null
    if (oChars) {
      for (let i = 0; i < oChars.length; i++) {
        oChar = oChars[i]
        oChar.addEventListener('touchstart', handleTouchStart, false)
        oChar.addEventListener('touchmove', handleTouchMove, false)
        oChar.addEventListener('touchend', handleTouchEnd, false)
      }
    }
  }

  function handleTouchStart(this: HTMLDivElement, e: TouchEvent) {
    // get the cell width
    cellW = this.offsetWidth
    cellH = this.offsetHeight
    this.style.width = cellW + 'px'
    this.style.height = cellH + 'px'
    this.style.position = 'fixed'

    let cellX = this.offsetLeft
    let cellY = this.offsetTop

    startX = e.touches[0].clientX
    startY = e.touches[0].clientY

    mouseX = startX - cellX
    mouseY = startY - cellY

    this.style.left = cellX + 'px'
    this.style.top = cellY + 'px'
  }
  function handleTouchMove(this: HTMLDivElement, e: TouchEvent) {
    e.preventDefault()
    console.log('move')

    const moveX = e.touches[0].clientX,
      moveY = e.touches[0].clientY

    let cellX = moveX - mouseX
    let cellY = moveY - mouseY

    this.style.left = cellX + 'px'
    this.style.top = cellY + 'px'
  }
  function handleTouchEnd(e: TouchEvent) {}

  init()
})()
