import { refreshTodos } from '../funcs/refreshTodos'

export const createTodoAction = (createValue, refreshFlag) => (dispatch) => {
  console.log(createValue)
  fetch('http://localhost:3005/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      userId: 1,
      id: new Date().valueOf(),
      title: createValue,
      completed: false,
    }),
  })
    .then((rawResponse) => rawResponse.json())
    .then(() => refreshTodos(dispatch, refreshFlag))
    .finally(() => dispatch({ type: 'SET_IS_CREATING', payload: false }))
    .finally(() => dispatch({ type: 'SET_INPUT_CREATE_VALUE', payload: '' }))
}
