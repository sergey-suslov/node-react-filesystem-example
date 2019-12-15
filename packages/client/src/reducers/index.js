import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import history from '../services/history'
import userReducer, { moduleName as user } from './user-reducer'
import filesReducer, { moduleName as files } from './files-reducer'

export default {
  router: connectRouter(history),
  form,
  [user]: userReducer,
  [files]: filesReducer
}
