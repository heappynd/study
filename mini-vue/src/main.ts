import { reactive, effect, computed, watch } from './reactivity/src'

const arr = reactive(['foo'])

effect(() => {
  console.log(arr[0])
})

effect(() => {
  console.log(arr.length)
})

arr[0] = 'bar'
