import listSelector from '../reducers/lists/selector'

export const LOAD_MORE = 'LOAD_MORE'

export const chunkSize = 10

export const loadMore = listId => (dispatch, getState) => dispatch({
  type: LOAD_MORE,
  payload: {
    id: listId,
    size: (listSelector(getState(), { id: listId }) || chunkSize) + chunkSize,
  },
})
