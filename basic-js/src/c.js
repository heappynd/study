import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'animate.css'

//
// <textarea>p {color: red;}</textarea>
// <br />
// <input type="text" value="css" />
// <button>ok</button>
// <hr />

function high(language: string, content: string) {
  const pre = document.createElement('pre')
  pre.className = `language-${language}`
  const code = document.createElement('code')
  code.textContent = content
  pre.appendChild(code)
  pre.addEventListener('click', () => {
    pre.classList.add('animate__animated')
    pre.classList.add('animate__zoomOut')
    // c
    pre.addEventListener('animationend', () => {
      console.log('end')
      pre.parentNode?.removeChild(pre)
    })
  })
  document.body.appendChild(pre)
  // Prism.highlightAll()
}

high('css', `p {color: red;}`)

const textarea = document.querySelector('textarea')
const input = document.querySelector('input')
const btn = document.querySelector('button')

btn?.addEventListener('click', () => {
  const content = textarea?.value
  const language = input?.value
  high(language, content)
})

let observer = new MutationObserver((records) => {
  console.log(records)
  for (const record of records) {
    record.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.className.includes(`language-`)) {
          console.log(node)
          console.log(111)

          node.classList.add('animate__animated')
          node.classList.add('animate__zoomIn')

          Prism.highlightElement(node)
        }
      }
    })
    record.removedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.className.includes(`language-`)) {
          console.log(node)
          console.log(111)

          Prism.highlightElement(node)
        }
      }
    })
  }
})
observer.observe(document.body, {
  subtree: true,
  childList: true,
})
