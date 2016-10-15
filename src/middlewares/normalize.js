import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import { normalize } from 'normalizr'
import Schema from '../schema'

export const NORMALIZE_ENTITIES = Symbol('Normalize Entities')

const associatedEntityTypes = reduce(Schema, (carry, schema) => (schema.getItemSchema || !schema.getKey
  ? carry
  : { ...carry, [schema.getKey()]: schema.getMeta('actionType') }
), {})

export default store => next => (action) => {
  const normalizeEntities = action[NORMALIZE_ENTITIES]
  if (typeof normalizeEntities === 'undefined') {
    return next(action)
  }

  const payload = normalizeEntities.payload
  const schema = normalizeEntities.meta

  if (typeof payload === 'undefined') {
    throw new Error('No data to normalize.')
  }

  if (typeof schema === 'undefined') {
    throw new Error('No meta data attached to the action.')
  }

  if (values(Schema).indexOf(schema) === -1) {
    throw new Error('Specify a valid SCHEMA.')
  }

  return forEach(normalize(payload, schema).entities, (entities, key) => store.dispatch({
    type: associatedEntityTypes[key],
    payload: entities,
  }))
}
