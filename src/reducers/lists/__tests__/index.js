import { Map } from 'immutable'
import reducer from '..'
import { LOAD_MORE } from '../../../actions/lists'

describe('lists reducer', () => {
  it('returns an empty Map by default', () => {
    expect(reducer(undefined, { type: 'INITIAL' })).toEqual(new Map())
  })

  it('adds a new list', () => {
    expect(reducer(undefined, {
      type: LOAD_MORE,
      payload: {
        id: '42',
        size: 10,
      },
    })).toEqual(new Map({
      42: 10,
    }))
  })

  it('updates an existing list', () => {
    const state = new Map({
      42: 10,
    })

    expect(reducer(state, {
      type: LOAD_MORE,
      payload: {
        id: '42',
        size: 20,
      },
    })).toEqual(new Map({
      42: 20,
    }))
  })
})
