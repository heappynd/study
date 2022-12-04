// import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAsync } from './counterSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)

  const dispatch = useAppDispatch()

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>

      <button onClick={() => dispatch(incrementAsync(5))}>
        Increment Async
      </button>
    </div>
  )
}
