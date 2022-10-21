type CharArea = {
  startX: number
  startY: number
}
;(() => {
  const idioms = ['诗情画意', '南来北往', '一团和气', '落花流水'],
    oCharCellGroup = document.querySelector('.char-cell-group')!

  let charCollection: string[] = [],
    charAreas: CharArea[] = [],
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
    getAreas(oChars, charAreas)
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
      <div class="cell-item">
        <div class="wrapper" data-index="${index}">${char}</div>
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
  function handleTouchEnd(this: HTMLDivElement, e: TouchEvent) {
    const _index = +this.dataset.index!,
      charArea = charAreas[_index]

    console.log(_index)
    this.style.left = charArea.startX + 'px'
    this.style.top = charArea.startY + 'px'
  }

  // 保存位置
  function getAreas(
    domCollection: NodeListOf<HTMLDivElement>,
    arrWrapper: CharArea[]
  ) {
    let startX = 0,
      startY = 0,
      oItem = null

    for (let i = 0; i < domCollection.length; i++) {
      oItem = domCollection[i]
      startX = oItem.offsetLeft
      startY = oItem.offsetTop

      arrWrapper.push({ startX, startY })
    }

    console.log(arrWrapper)
  }

  init()
})()
