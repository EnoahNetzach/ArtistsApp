import { applyMiddleware, compose, createStore } from 'redux'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import normalize from './middlewares/normalize'

export default (reducers, initialState) => createStore(
  reducers,
  fromJS(initialState),
  compose(
    applyMiddleware(
      thunk,
      normalize,
    ),
    process.env.NODE_ENV === 'development' && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f
  )
)
