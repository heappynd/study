import { effect, ref } from '@vue/reactivity'

function renderer(domString: string, container: HTMLElement) {
  container.innerHTML = domString
}

const count = ref(1)

effect(() => {
  renderer(`<h1>${count.value}</h1>`, document.getElementById('app')!)
})

setTimeout(() => {
  count.value++
}, 1000)
