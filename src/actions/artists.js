import { NORMALIZE_ENTITIES } from '../middlewares/normalize'
import Schema from '../schema'

export const ARTISTS_NORMALIZED = 'ARTISTS_NORMALIZED'

export const normalizeArtists = artists => ({
  [NORMALIZE_ENTITIES]: {
    payload: artists,
    meta: Schema.ARTISTS,
  },
})
