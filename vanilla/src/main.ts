type Area = {
  startX: number
  startY: number
}
;(() => {
  const idioms = ['诗情画意', '南来北往', '一团和气', '落花流水'],
    oCharCellGroup = document.querySelector('.char-cell-group')!,
    oBlanks: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.blank-cell-group .wrapper'
    )

  let charCollection: string[] = [],
    charAreas: Area[] = [],
    blackAreas: Area[] = [],
    resArr: { char: string; el: HTMLDivElement }[] = [
      // { char: '',el: null }
    ],
    oChars: NodeListOf<HTMLDivElement> | null = null,
    startX = 0,
    startY = 0,
    cellX = 0,
    cellY = 0,
    cellW = 0,
    cellH = 0,
    mouseX = 0, // 鼠标到元素边框距离
    mouseY = 0

  const init = () => {
    charCollection = formatCharsArr()
    console.log(charCollection)
    render()

    oChars = oCharCellGroup.querySelectorAll('.cell-item .wrapper')
    getAreas(oBlanks, blackAreas)
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

    cellX = this.offsetLeft
    cellY = this.offsetTop

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

    cellX = moveX - mouseX
    cellY = moveY - mouseY

    this.style.left = cellX + 'px'
    this.style.top = cellY + 'px'
  }
  function handleTouchEnd(this: HTMLDivElement, e: TouchEvent) {
    const blankWidth = oBlanks[0].offsetWidth,
      blankHeight = oBlanks[0].offsetHeight

    for (let i = 0; i < blackAreas.length; i++) {
      if (resArr[i] !== undefined) {
        continue
      }
      let { startX, startY } = blackAreas[i]
      // 对比
      if (
        (cellX > startX &&
          cellX < startX + blankWidth / 2 &&
          cellY > startY &&
          cellY > startY + blankHeight / 2) ||
        (cellX + blankWidth > startX + blankWidth / 2 &&
          cellX + blankWidth < startX + blankWidth &&
          cellY > startY &&
          cellY < startY + blankHeight / 2)
      ) {
        setPosition(this, { startX, startY })
        setResArr(this, i)
        // FIXME: has error
        if (resArr.length === 4) {
          // check res
          setTimeout(() => {
            if (!checkResult()) {
              alert('error')
              resetPosition()
            } else {
              alert('success')
            }
          }, 500)
        }
        return
      }
    }

    const _index = +this.dataset.index!,
      charArea = charAreas[_index]

    console.log(_index)
    this.style.left = charArea.startX + 'px'
    this.style.top = charArea.startY + 'px'
  }

  function setPosition(el: HTMLDivElement, { startX, startY }: Area) {
    el.style.left = startX + 'px'
    el.style.top = startY + 'px'
  }
  function resetPosition() {
    resArr.forEach((item) => {
      const el = item.el,
        index = Number(el.dataset.index),
        { startX, startY } = charAreas[index]

      setPosition(el, { startX, startY })
    })
    resArr = []
    startX = 0
    startY = 0
    cellX = 0
    cellY = 0
    mouseX = 0 // 鼠标到元素边框距离
    mouseY = 0

    cellW = 0
    cellH = 0
  }
  function setResArr(el: HTMLDivElement, index: number) {
    resArr[index] = {
      char: el.innerText,
      el,
    }
  }

  function checkResult() {
    let idiom = ''
    resArr.forEach((item) => {
      idiom += item.char
    })
    return idioms.find((item) => item === idiom)
  }

  // 保存位置
  function getAreas(
    domCollection: NodeListOf<HTMLDivElement>,
    arrWrapper: Area[]
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
