import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Details from '../Details'

const store = createStore(() => {})
const muiTheme = getMuiTheme({})

injectTapEventPlugin()

describe('Details', () => {
  it('renders without crashing', () => {
    const artist = {
      uuid: '42',
      gender: 'F',
      age: 42,
      rate: 42,
    }

    mount(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Details artist={artist} />
        </MuiThemeProvider>
      </Provider>
    )
  })
})
