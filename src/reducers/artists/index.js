import { Map } from 'immutable'
import mapValues from 'lodash/mapValues'
import Artist from './definition'
import { ARTISTS_NORMALIZED } from '../../actions/artists'

export default (state = new Map(), { type, payload }) => {
  switch (type) {
    case ARTISTS_NORMALIZED:
      return state.mergeDeep(new Map(
        mapValues(payload, artist => new Artist(artist)),
      ))
    default:
      return state
  }
}
