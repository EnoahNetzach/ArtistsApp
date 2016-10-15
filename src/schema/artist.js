import { Schema } from 'normalizr'
import { ARTISTS_NORMALIZED } from '../actions/artists'

const artistDefinition = {
  idAttribute: 'uuid',
  meta: {
    actionType: ARTISTS_NORMALIZED,
  },
}

export default new Schema('artists', artistDefinition)
