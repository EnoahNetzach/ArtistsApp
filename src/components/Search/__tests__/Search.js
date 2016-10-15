import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reduxForm } from 'redux-form/immutable'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Search from '../Search'

const store = createStore(() => {})
const muiTheme = getMuiTheme({})

injectTapEventPlugin()

describe('Search', () => {
  it('renders without crashing', () => {
    const SearchImpl = reduxForm({ form: 'fake-form' })(Search)

    mount(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <SearchImpl />
        </MuiThemeProvider>
      </Provider>
    )
  })
})
