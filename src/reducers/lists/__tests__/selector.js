import { fromJS } from 'immutable'
import selector from '../selector'

const store = fromJS({
  lists: {
    42: 10,
    50: 30,
  },
})

describe('lists selector', () => {
  it('returns the whole array by default', () => {
    expect(selector(store)).toEqual(store.get('lists').toArray())
  })

  it('returns the size of a list if an id is given', () => {
    expect(selector(store, { id: 42 })).toEqual(store.get('lists').toArray()[0])
  })
})
