import { useEffect } from 'react'
import styles from '../css/todolist.module.css'
import TodoInputs from './TodoInputs'
import Todo from './Todo'
import { todosRenderAction } from '../actions/todosRenderAction'
import { useDispatch, useSelector } from 'react-redux'
import { refreshFlagSelector } from '../selectors/flags/refreshFlag-selector'
import { isLoadingSelector } from '../selectors/flags/isLoading-selector'
import { isSortedAlSelector } from '../selectors/flags/isSortedAl-selector'
import { isSearchingSelector } from '../selectors/flags/isSearching-selector'
import { todosSelector } from '../selectors/todos/todos-selector'
import { filteredTodosSelector } from '../selectors/todos/filteredTodos-selector'
import { searchValueSelector } from '../selectors/inputs/searchValue-selector'

const TodoList = () => {
  const todos = useSelector(todosSelector)
  const filteredTodos = useSelector(filteredTodosSelector)
  const isLoading = useSelector(isLoadingSelector)
  const refreshTodosFlag = useSelector(refreshFlagSelector)
  const isSearching = useSelector(isSearchingSelector)
  const inputSearchValue = useSelector(searchValueSelector)
  const isSortedAlphabetically = useSelector(isSortedAlSelector)

  const dispatch = useDispatch()

  const sortTodosAlphabetically = () => {
    dispatch({
      type: 'SET_IS_SORTED_ALPHABETICALLY',
      payload: !isSortedAlphabetically,
    })
  }

  useEffect(() => {
    dispatch({ type: 'SET_IS_LAODING', payload: true })
    dispatch(todosRenderAction())
  }, [refreshTodosFlag, dispatch])

  useEffect(() => {
    const handleSearchAndSort = (searchValue) => {
      let filtered = todos

      if (searchValue) {
        filtered = todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      }

      if (isSortedAlphabetically) {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      }

      dispatch({
        type: 'SET_FILTERED_TODOS',
        payload: filtered,
      })
    }

    handleSearchAndSort(inputSearchValue)
  }, [inputSearchValue, todos, isSortedAlphabetically, dispatch])

  return (
    <div className={styles['todo-container']}>
      <button
        className={isSearching ? styles['search-active'] : styles.search}
        onClick={() =>
          dispatch({ type: 'SET_IS_SEARCHING', payload: !isSearching })
        }
      >
        Поиск дела
      </button>
      <TodoInputs />
      <button
        onClick={sortTodosAlphabetically}
        className={styles['sort-button']}
      >
        {isSortedAlphabetically
          ? 'Отсортировать по алфавиту'
          : 'Отсортировать по алфавиту'}
      </button>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        filteredTodos.map(({ id, title }) => {
          return <Todo id={id} title={title} key={id} />
        })
      )}
    </div>
  )
}

export default TodoList
