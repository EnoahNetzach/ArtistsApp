import React from 'react'
import { shallow } from 'enzyme'
import Router from '../Router'

describe('Router', () => {
  it('renders without crashing', () => {
    shallow(<Router />)
  })
})
