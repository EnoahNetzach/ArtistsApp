import React from 'react'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import AppContainer from '..'

const store = createStore(() => {})

describe('AppContainer', () => {
  it('renders without crashing', () => {
    shallow(<AppContainer store={store} />)
  })
})
