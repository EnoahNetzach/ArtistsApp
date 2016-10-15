import { combineReducers } from 'redux-immutable'
import { reducer as reduxFormReducer } from 'redux-form/immutable'
import entitiesReducer from './entities'
import listsReducer from './lists'

export default combineReducers({
  entities: entitiesReducer,
  form: reduxFormReducer,
  lists: listsReducer,
})
