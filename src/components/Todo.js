import React from 'react'
import styles from '../css/todolist.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodoAction } from '../actions/upadateTodoAction'
import { deleteTodoAction } from '../actions/deleteTodoAction'
import { isUpdatingSelector } from '../selectors/flags/isUpdating-selector'
import { editingIdSelector } from '../selectors/editingId-selector'
import { isDeletingSelector } from '../selectors/flags/isDeleting-selector'
import { updateValueSelector } from '../selectors/inputs/updateValue-selector'
import { refreshFlagSelector } from '../selectors/flags/refreshFlag-selector'

const Todo = ({ id, title }) => {
  const inputUpdateValue = useSelector(updateValueSelector)
  const isDeleting = useSelector(isDeletingSelector)
  const isUpdating = useSelector(isUpdatingSelector)
  const editingTodoId = useSelector(editingIdSelector)
  const refreshFlag = useSelector(refreshFlagSelector)

  const dispatch = useDispatch()

  const updateTodo = (id) => {
    dispatch({ type: 'SET_IS_UPDATING', payload: true })
    dispatch(updateTodoAction(id, inputUpdateValue, refreshFlag))
  }

  const deleteTodo = (id) => {
    dispatch({ type: 'SET_IS_DELETING', payload: true })
    dispatch(deleteTodoAction(id, refreshFlag))
  }

  const startEditingTodo = (id, title) => {
    dispatch({
      type: 'SET_EDITING_TODO_ID',
      payload: id,
    })
    dispatch({
      type: 'SET_INPUT_UPDATE_VALUE',
      payload: title,
    })
  }

  return (
    <div className={styles.todo}>
      {editingTodoId === id ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            updateTodo(id)
          }}
        >
          <input
            placeholder='Поменяйте дело...'
            value={inputUpdateValue}
            onChange={({ target }) => {
              dispatch({
                type: 'SET_INPUT_UPDATE_VALUE',
                payload: target.value,
              })
            }}
          ></input>
          <button className='custom-button' disabled={isUpdating} type='submit'>
            Применить
          </button>
        </form>
      ) : (
        <span className={styles['todo-title']}>{title}</span>
      )}
      <div>
        <button
          className={editingTodoId === id ? styles.hidden : 'custom-button'}
          onClick={() => startEditingTodo(id, title)}
        >
          Изменить
        </button>

        <button
          className='custom-button'
          disabled={isDeleting}
          onClick={() => deleteTodo(id)}
        >
          Выполнено
        </button>
      </div>
    </div>
  )
}

export default Todo
