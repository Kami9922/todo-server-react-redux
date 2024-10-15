import { refreshTodos } from '../funcs/refreshTodos'

export const deleteTodoAction = (id, refreshFlag) => (dispatch) => {
  fetch(`http://localhost:3005/todos/${id}`, {
    method: 'DELETE',
  })
    .then((rawResponse) => rawResponse.json())
    .then(() => {
      refreshTodos(dispatch, refreshFlag)
    })
    .finally(() => dispatch({ type: 'SET_IS_DELETING', payload: false }))
}
