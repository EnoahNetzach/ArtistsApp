import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import SearchContainer from '..'

jest.mock('../../../reducers/artists/selector')
jest.mock('../../../reducers/lists/selector')

const store = createStore(() => {})
const muiTheme = getMuiTheme({})

injectTapEventPlugin()

describe('List', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <SearchContainer />
        </MuiThemeProvider>
      </Provider>
    )
  })
})
