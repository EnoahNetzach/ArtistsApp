import { combineReducers } from 'redux-immutable'
import { reducer as reduxFormReducer } from 'redux-form/immutable'
import entitiesReducer from './entities'

export default combineReducers({
  entities: entitiesReducer,
  form: reduxFormReducer,
})
