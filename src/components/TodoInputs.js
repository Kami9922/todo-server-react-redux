import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/todoInputs.module.css'
import { createTodoAction } from '../actions/createTodoAction'
import { refreshTodos } from '../funcs/refreshTodos'
import { createValueSelector } from '../selectors/inputs/createValue-selector'
import { refreshFlagSelector } from '../selectors/flags/refreshFlag-selector'
import { isSearchingSelector } from '../selectors/flags/isSearching-selector'
import { isCreatingSelector } from '../selectors/flags/isCreating-selector'

const TodoInputs = () =>
  // {
  //   inputCreateValue,
  //   setInputCreateValue,
  //   isCreating,
  //   isSearching,
  //   setInputSearchValue,
  //   createTodo,
  // }
  {
    const inputCreateValue = useSelector(createValueSelector)
    const isSearching = useSelector(isSearchingSelector)
    const isCreating = useSelector(isCreatingSelector)
    // const refreshFlag = useSelector(refreshFlagSelector)

    const dispatch = useDispatch

    const createTodo = (e) => {
      e.preventDefault()
      // setIsCreating(true)
      dispatch({ type: 'SET_IS_CREATING', payload: true })
      createTodoAction(inputCreateValue)
    }

    return (
      <div className={styles['inputs-header']}>
        {isSearching ? (
          <input
            placeholder='Поиск дела...'
            className={styles['todo-input']}
            onChange={({ target }) => {
              // setInputSearchValue(target.value)
              dispatch({
                type: 'SET_INPUTE_SEARCH_VALUE',
                payload: target.value,
              })
            }}
          ></input>
        ) : (
          <form className={styles['todo-input']} onSubmit={createTodo}>
            <input
              placeholder='Создайте дело...'
              name='todo-title'
              type='text'
              value={inputCreateValue}
              onChange={({ target }) => {
                // setInputCreateValue(target.value)
                dispatch({
                  type: 'SET_INPUTE_CREATE_VALUE',
                  payload: target.value,
                })
              }}
            ></input>
            <button
              className='custom-button'
              disabled={isCreating}
              type='submit'
            >
              Добавить дело
            </button>
          </form>
        )}
      </div>
    )
  }

export default TodoInputs
