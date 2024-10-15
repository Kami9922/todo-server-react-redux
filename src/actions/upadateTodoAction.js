import { refreshTodos } from '../funcs/refreshTodos'

export const updateTodoAction =
  (id, updateValue, refreshFlag) => (dispatch) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: updateValue,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then(() => {
        console.log(updateValue)

        dispatch({ type: 'SET_EDITING_TODO_ID', payload: null })
        dispatch({ type: 'SET_INPUT_UPDATE_VALUE', payload: '' })
        refreshTodos(dispatch, refreshFlag)
      })
      .finally(() => dispatch({ type: 'SET_IS_UPDATING', payload: false }))
  }
