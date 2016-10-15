import { fromJS, Map } from 'immutable'
import reducer from '..'
import Artist from '../definition'
import { ARTISTS_NORMALIZED } from '../../../actions/artists'

describe('artists reducer', () => {
  it('returns an empty Map by default', () => {
    expect(reducer(undefined, { type: 'INITIAL' })).toEqual(new Map())
  })

  it('inserts new elements', () => {
    const artist = {
      uuid: '42',
      gender: 'F',
      age: 42,
      rate: 42,
    }

    expect(reducer(undefined, {
      type: ARTISTS_NORMALIZED,
      payload: {
        42: artist,
      },
    })).toEqual(fromJS({
      42: new Artist(artist),
    }))
  })

  it('updates existing elements', () => {
    const artist = {
      uuid: '42',
      gender: 'F',
      age: 42,
      rate: 42,
    }
    const artistModified = {
      uuid: '42',
      gender: 'M',
      age: 45,
      rate: 42,
    }

    const state = fromJS({
      42: new Artist(artist),
    })

    expect(reducer(state, {
      type: ARTISTS_NORMALIZED,
      payload: {
        42: artistModified,
      },
    })).toEqual(fromJS({
      42: new Artist(artistModified),
    }))
  })
})
