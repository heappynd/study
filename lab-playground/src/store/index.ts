import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value++
    },
    decremented: (state) => {
      state.value--
    },
  },
})

export const { increment, decremented } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer,
})

export default store
