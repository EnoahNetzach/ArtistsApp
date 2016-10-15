import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store'
import reducers from './reducers'
import App from './components/App'

const store = createStore(reducers, {})

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
