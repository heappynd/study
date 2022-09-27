import { defineStore } from 'pinia'

interface State {
  count: number
}

const useCounterStore = defineStore('counter', {
  state: (): State => {
    return { count: 0 }
  },
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
const counter = useCounterStore()
counter.count
counter.$patch({ count: counter.count + 1 })
counter.increment()

// mapStores(useCounterStore)
// mapState(useCounterStore, ['count'])
// mapActions(useCounterStore, ['increment'])
