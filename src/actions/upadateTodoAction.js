export const updateTodoAction = (id, updateValue) => (dispacth) => {
  fetch(`http://localhost:3005/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      title: updateValue,
    }),
  })
    .then((rawResponse) => rawResponse.json())
    .then(() => {
      // setEditingTodoId(null)
      dispacth({ type: 'SET_EDITING_TODO_ID', payload: null })
      // refresh(dispacth, refreshFlag)
    })
    .finally(() =>
      // setIsUpdating(false)
      dispacth({ type: 'SET_IS_UPDATING', payload: false })
    )
}
