export const initialState = {
  todos: [],
  filteredTodos: [],
}

export const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: payload,
      }
    case 'SET_FILTERED_TODOS':
      return {
        ...state,
        filteredTodos: payload,
      }
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: payload,
      }

    default:
      return state
  }
}
