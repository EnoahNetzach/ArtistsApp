import { arrayOf } from 'normalizr'
import artistSchema from './artist'

export default {
  ARTIST: artistSchema,
  ARTISTS: arrayOf(artistSchema),
}
