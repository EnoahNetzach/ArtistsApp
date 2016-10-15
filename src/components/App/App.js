import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const muiTheme = getMuiTheme({})

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>{props.children}</div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
