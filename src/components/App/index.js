import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Router from '../Router'

const AppContainer = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
)

AppContainer.propTypes = {
  store: PropTypes.shape({}).isRequired,
}

export default AppContainer
