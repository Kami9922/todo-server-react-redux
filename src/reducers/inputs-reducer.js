export const initialState = {
  inputCreateValue: '',
  inputUpdateValue: '',
  inputSearchValue: '',
}

export const inputsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_INPUT_CREATE_VALUE':
      return {
        ...state,
        inputCreateValue: payload,
      }
    case 'SET_INPUT_UPDATE_VALUE':
      return {
        ...state,
        inputUpdateValue: payload,
      }
    case 'SET_INPUT_SEARCH_VALUE':
      return {
        ...state,
        inputSearchValue: payload,
      }

    default:
      return state
  }
}
