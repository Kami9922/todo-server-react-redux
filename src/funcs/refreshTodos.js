export const refreshTodos = (dispatch, refreshFlag) => {
  dispatch({ type: 'SET_REFRESH_TODOS_FLAG', payload: !refreshFlag })
}
