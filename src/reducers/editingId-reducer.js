export const initialState = {}

export const editingIdReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_EDITING_TODO_ID':
      return {
        ...state,
        editingTodoId: payload,
      }

    default:
      return state
  }
}
