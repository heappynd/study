import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './reducer'
import countReducer from './countReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  main: reducer,
  count: countReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type RootState = ReturnType<typeof store.getState>