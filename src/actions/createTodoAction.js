export const createTodoAction = (createValue) => (dispatch) => {
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
    // .then(() => {
    //   refresh(, refreshFlag)
    // })
    .finally(() =>
      //  setIsCreating(false)
      dispatch({ type: 'SET_IS_CREATING', payload: false })
    )
    .finally(() =>
      // setInputCreateValue('')
      dispatch({ type: 'SET_INPUT_CREATE_VALUE', payload: '' })
    )
}
