import React from 'react'
import {
  browserHistory,
  IndexRoute,
  Route,
  Router as ReactRouter,
} from 'react-router'
import App from './App'
import Search from '../Search'

const Router = () => (
  <ReactRouter history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Search} />
    </Route>
  </ReactRouter>
)

export default Router
