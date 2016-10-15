import React from 'react'
import {
  browserHistory,
  IndexRoute,
  Route,
  Router as ReactRouter,
} from 'react-router'
import connectRoute from './connectRoute'
import App from './App'
import Search from '../Search'

const mapParametersToProps = ({ location }) => ({
  currentArtistUuid: location.query.uuid,
})

const Router = () => (
  <ReactRouter history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={connectRoute(mapParametersToProps)(Search)} />
    </Route>
  </ReactRouter>
)

export default Router
