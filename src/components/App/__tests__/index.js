import React from 'react'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import App from '..'

const store = createStore(() => {})

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App store={store} />)
  })
})
