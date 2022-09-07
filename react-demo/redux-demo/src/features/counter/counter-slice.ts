import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 50,
}

const counterSlicce = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) {
      // 内部使用了 immer makes it immutable
      state.value++
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { incremented, amountAdded } = counterSlicce.actions

export default counterSlicce.reducer
