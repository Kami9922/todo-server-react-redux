export const deleteTodoAction = (id) => (dispatch) => {
  fetch(`http://localhost:3005/todos/${id}`, {
    method: 'DELETE',
  })
    .then((rawResponse) => rawResponse.json())
    // .then(() => {
    // refresh(dispatch, refreshFlag)
    // })
    .finally(() =>
      //  setIsDeleting(false)
      dispatch({ type: 'SET_IS_DELETING', payload: false })
    )
}
