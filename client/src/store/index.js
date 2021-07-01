import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

const store = createStore(rootReducer, applyMiddleware(createLogger()))

export default store