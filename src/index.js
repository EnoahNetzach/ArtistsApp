import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store'
import { normalizeArtists } from './actions/artists'
import reducers from './reducers'
import App from './components/App'
import artistData from './data/artists.json'

const store = createStore(reducers)

store.dispatch(normalizeArtists(artistData.artists))

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
