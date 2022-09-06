import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { postsReducer } from './reducers/posts'
import reduxThunk from 'redux-thunk'

const reducer = combineReducers({
  postsReducer,
})

const store = createStore(reducer, applyMiddleware(reduxThunk))

export default store
