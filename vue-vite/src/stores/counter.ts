import { ref, computed } from 'vue'
import { defineStore, mapActions, mapState, mapStores } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   function increment() {
//     count.value++
//   }
//   const doubleCount = computed(() => count.value * 2)
//   return { count, increment, doubleCount }
// })

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
