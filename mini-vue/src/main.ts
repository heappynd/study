import { reactive, effect, computed, watch } from './reactivity/src'

const arr = reactive(['foo'])

effect(() => {
  console.log(arr[0])
})

debugger
arr.length = 0
