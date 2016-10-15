import React from 'react'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import List from '../List'

const muiTheme = getMuiTheme({})

injectTapEventPlugin()

describe('List', () => {
  it('renders without crashing', () => {
    mount(
      <MuiThemeProvider muiTheme={muiTheme}>
        <List />
      </MuiThemeProvider>
    )
  })
})
