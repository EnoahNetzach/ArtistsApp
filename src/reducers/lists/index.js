import { Map } from 'immutable'
import { LOAD_MORE } from '../../actions/lists'

export default (state = new Map(), { type, payload }) => {
  switch (type) {
    case LOAD_MORE:
      return state.set(payload.id, payload.size)
    default:
      return state
  }
}
