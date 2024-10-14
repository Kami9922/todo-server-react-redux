export const todosRenderAction = () => (dispatch) => {
  fetch('http://localhost:3005/todos')
    .then((loadedData) => loadedData.json())
    .then((loadedTodos) => {
      dispatch({ type: 'SET_TODOS', payload: loadedTodos })
      dispatch({ type: 'SET_FILTERED_TODOS', payload: loadedTodos })
    })
    .finally(() => dispatch({ type: 'SET_IS_LAODING', payload: false }))
}
