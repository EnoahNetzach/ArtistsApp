import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reduxForm } from 'redux-form/immutable'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Form from '../Form'

const store = createStore(() => {})
const muiTheme = getMuiTheme({})

injectTapEventPlugin()

describe('Form', () => {
  it('renders without crashing', () => {
    const FormImpl = reduxForm({ form: 'fake-form' })(Form)

    mount(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <FormImpl />
        </MuiThemeProvider>
      </Provider>
    )
  })
})
