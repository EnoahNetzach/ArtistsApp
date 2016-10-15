import { createSelector } from 'reselect'

export default createSelector(
  (state, data = {}) => data.id && String(data.id),
  state => state.get('lists'),
  (listId, lists) => {
    if (listId) {
      return lists.get(listId)
    }

    return lists.toArray()
  },
)
