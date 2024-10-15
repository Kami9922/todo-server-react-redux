import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'

import { thunk } from 'redux-thunk'
import { flagsReducer } from './reducers/flags-reducer'
import { inputsReducer } from './reducers/inputs-reducer'
import { todosReducer } from './reducers/todos-reducer'
import { editingIdReducer } from './reducers/editingId-reducer'

const reducer = combineReducers({
  flags: flagsReducer,
  inputs: inputsReducer,
  todos: todosReducer,
  editingId: editingIdReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)
