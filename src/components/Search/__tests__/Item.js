import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Item from '../Item'

const store = createStore(() => {})
const muiTheme = getMuiTheme({})

injectTapEventPlugin()

describe('Item', () => {
  it('renders without crashing', () => {
    const artist = {
      gender: 'F',
      age: 42,
      rate: 42,
    }

    mount(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Item artist={artist} />
        </MuiThemeProvider>
      </Provider>
    )
  })
})
