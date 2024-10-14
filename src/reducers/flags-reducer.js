export const initialState = {
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isSearching: false,
  isSortedAlphabetically: false,
  refreshTodosFlag: false,
}

export const flagsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_IS_LAODING':
      return {
        ...state,
        isLoading: payload,
      }
    case 'SET_IS_CREATING':
      return {
        ...state,
        isCreating: payload,
      }
    case 'SET_IS_UPDATING':
      return {
        ...state,
        isUpdating: payload,
      }
    case 'SET_IS_DELETING':
      return {
        ...state,
        isDeleting: payload,
      }
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        isSearching: payload,
      }
    case 'SET_IS_SORTED_ALPHABETICALLY':
      return {
        ...state,
        isSortedAlphabetically: payload,
      }
    case 'SET_REFRESH_TODOS_FLAG':
      return {
        ...state,
        refreshTodosFlag: payload,
      }
    default:
      return state
  }
}
