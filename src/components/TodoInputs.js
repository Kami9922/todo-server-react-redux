import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/todoInputs.module.css'
import { createTodoAction } from '../actions/createTodoAction'
import { createValueSelector } from '../selectors/inputs/createValue-selector'
import { refreshFlagSelector } from '../selectors/flags/refreshFlag-selector'
import { isSearchingSelector } from '../selectors/flags/isSearching-selector'
import { isCreatingSelector } from '../selectors/flags/isCreating-selector'

const TodoInputs = () => {
  const inputCreateValue = useSelector(createValueSelector)
  const isSearching = useSelector(isSearchingSelector)
  const isCreating = useSelector(isCreatingSelector)
  const refreshFlag = useSelector(refreshFlagSelector)

  const dispatch = useDispatch()

  const createTodo = (event) => {
    event.preventDefault()

    dispatch({ type: 'SET_IS_CREATING', payload: true })
    dispatch(createTodoAction(inputCreateValue, refreshFlag))
  }

  return (
    <div className={styles['inputs-header']}>
      {isSearching ? (
        <input
          placeholder='Поиск дела...'
          className={styles['todo-input']}
          onChange={({ target }) => {
            dispatch({
              type: 'SET_INPUT_SEARCH_VALUE',
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
              dispatch({
                type: 'SET_INPUT_CREATE_VALUE',
                payload: target.value,
              })
            }}
          ></input>
          <button className='custom-button' disabled={isCreating} type='submit'>
            Добавить дело
          </button>
        </form>
      )}
    </div>
  )
}

export default TodoInputs
