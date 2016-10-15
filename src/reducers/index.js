import { combineReducers } from 'redux-immutable'
import { reducer as reduxFormReducer } from 'redux-form/immutable'

export default combineReducers({
  form: reduxFormReducer,
})
