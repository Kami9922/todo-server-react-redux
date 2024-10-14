import React from 'react'
import styles from '../css/todolist.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodoAction } from '../actions/upadateTodoAction'
import { deleteTodoAction } from '../actions/deleteTodoAction'
import { refreshTodos } from '../funcs/refreshTodos'
import { isUpdatingSelector } from '../selectors/flags/isUpdating-selector'
import { editingIdSelector } from '../selectors/editingId-selector'
import { isDeletingSelector } from '../selectors/flags/isDeleting-selector'
import { currentTodoSelector } from '../selectors/todos/currentTodo-selector'
import { updateValueSelector } from '../selectors/inputs/updateValue-selector'
import { refreshFlagSelector } from '../selectors/flags/refreshFlag-selector'

const Todo = () => {
  const inputUpdateValue = useSelector(updateValueSelector)
  const isDeleting = useSelector(isDeletingSelector)
  const isUpdating = useSelector(isUpdatingSelector)
  const editingTodoId = useSelector(editingIdSelector)
  const currentTodo = useSelector(currentTodoSelector)
  // const refreshFlag = useSelector(refreshFlagSelector)

  const { id, title } = currentTodo
  const dispatch = useDispatch()

  const updateTodo = (id) => {
    // setIsUpdating(true)
    dispatch({ type: 'SET_IS_UPDATING', payload: true })
    updateTodoAction(id, inputUpdateValue)
  }

  const deleteTodo = (id) => {
    // setIsDeleting(true)
    dispatch({ type: 'SET_IS_DELETING', payload: true })
    deleteTodoAction(id)
  }

  const startEditingTodo = (id, title) => {
    // setEditingTodoId(id)
    dispatch({
      type: 'SET_EDITING_TODO_ID',
      payload: id,
    })
    // setInputUpdateValue(title)
    dispatch({
      type: 'SET_INPUT_UPDATE_VALUE',
      payload: title,
    })
  }

  return (
    <div className={styles.todo} key={id}>
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
              // setInputUpdateValue(target.value)
              dispatch({
                type: 'SET_INPUTE_UPDATE_VALUE',
                payload: target.value,
              })
            }}
          ></input>
          <button className='custom-button' disabled={isUpdating} type='submit'>
            Применить
          </button>
        </form>
      ) : (
        title
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
