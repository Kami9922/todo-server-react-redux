import { useEffect } from 'react'
import styles from '../css/todolist.module.css'
import TodoInputs from './TodoInputs'
import Todo from './Todo'
import { todosRenderAction } from '../actions/todosRenderAction'
import { useDispatch, useSelector } from 'react-redux'
import { refreshFlagSelector } from '../selectors/flags/refreshFlag-selector'
import { isLoadingSelector } from '../selectors/flags/isLoading-selector'
import { isCreatingSelector } from '../selectors/flags/isCreating-selector'
import { isDeletingSelector } from '../selectors/flags/isDeleting-selector'
import { isUpdatingSelector } from '../selectors/flags/isUpdating-selector'
import { isSortedAlSelector } from '../selectors/flags/isSortedAl-selector'
import { isSearchingSelector } from '../selectors/flags/isSearching-selector'
import { updateValueSelector } from '../selectors/inputs/updateValue-selector'
import { createValueSelector } from '../selectors/inputs/createValue-selector'
import { todosSelector } from '../selectors/todos/todos-selector'
import { filteredTodosSelector } from '../selectors/todos/filteredTodos-selector'
import { editingIdSelector } from '../selectors/editingId-selector'
import { setCurrentTodoAction } from '../actions/setCurrentTodo'
import { searchValueSelector } from '../selectors/inputs/searchValue-selector'

const TodoList = () => {
  // //Отображение
  // const [todos, setTodos] = useState([])
  const todos = useSelector(todosSelector)
  // const [filteredTodos, setFilteredTodos] = useState([])
  const filteredTodos = useSelector(filteredTodosSelector)
  // //Создание
  // const [inputCreateValue, setInputCreateValue] = useState('')
  const inputCreateValue = useSelector(createValueSelector)
  // //Изменение
  // const [inputUpdateValue, setInputUpdateValue] = useState('')
  const inputUpdateValue = useSelector(updateValueSelector)
  // const [isUpdating, setIsUpdating] = useState(false)
  const isUpdating = useSelector(isUpdatingSelector)
  // const [editingTodoId, setEditingTodoId] = useState(null)
  const editingTodoId = useSelector(editingIdSelector)
  // //Блокировка кнопок
  // const [isLoading, setIsLoading] = useState(false)
  const isLoading = useSelector(isLoadingSelector)
  // const [isCreating, setIsCreating] = useState(false)
  const isCreating = useSelector(isCreatingSelector)
  // const [isDeleting, setIsDeleting] = useState(false)
  const isDeleting = useSelector(isDeletingSelector)
  // //Флаг обновления компонента для useEffect
  // const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)
  const refreshTodosFlag = useSelector(refreshFlagSelector)
  // //Поиск
  // const [isSearching, setIsSearching] = useState(false)
  const isSearching = useSelector(isSearchingSelector)
  // const [inputSearchValue, setInputSearchValue] = useState('')
  const inputSearchValue = useSelector(searchValueSelector)
  // //Сортировка
  // const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false)
  const isSortedAlphabetically = useSelector(isSortedAlSelector)

  const dispatch = useDispatch()

  // const refreshTodos = () =>
  //   dispatch({ type: 'SET_REFRESH_TODOS_FLAG', payload: !refreshTodosFlag })

  const sortTodosAlphabetically = () => {
    dispatch({
      type: 'SET_IS_SORTED_ALPHABETICALLY',
      payload: !isSortedAlphabetically,
    })
  }

  // const startEditingTodo = (id, title) => {
  //   // setEditingTodoId(id)
  //   dispatch({
  //     type: 'SET_EDITING_TODO_ID',
  //     payload: id,
  //   })
  //   // setInputUpdateValue(title)
  //   dispatch({
  //     type: 'SET_INPUT_UPDATE_VALUE',
  //     payload: title,
  //   })
  // }

  // useEffect(() => {
  //   dispatch({ type: 'SET_IS_LAODING', payload: true })
  // todosRenderAction()
  // }, [refreshTodosFlag, dispatch])

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

      //setFilteredTodos(filtered)
      dispatch({
        type: 'SET_FILTERED_TODOS',
        payload: filtered,
      })
    }

    handleSearchAndSort(inputSearchValue)
  }, [inputSearchValue, todos, isSortedAlphabetically, dispatch])

  // const createTodo = (e) => {
  //   e.preventDefault()
  //   // setIsCreating(true)
  //   dispatch({ type: 'SET_IS_CREATING', payload: true })
  //   createTodoAction(inputCreateValue, refreshTodos)
  // }

  // const updateTodo = (id) => {
  //   // setIsUpdating(true)
  //   dispatch({ type: 'SET_IS_UPDATING', payload: true })
  //   updateTodoAction(id, refreshTodos, inputUpdateValue)
  // }

  // const deleteTodo = (id) => {
  //   // setIsDeleting(true)
  //   dispatch({ type: 'SET_IS_DELETING', payload: true })
  //   deleteTodoAction(id, refreshTodos)
  // }

  return (
    <div className={styles['todo-container']}>
      <button
        className={isSearching ? styles['search-active'] : styles.search}
        onClick={() =>
          // setIsSearching(!isSearching)
          dispatch({ type: 'SET_IS_SEARCHING', payload: true })
        }
      >
        Поиск дела
      </button>
      <TodoInputs
      // createTodo={createTodo}
      // inputSearchValue={inputSearchValue}
      // setInputSearchValue={setInputSearchValue}
      // setIsSearching={setIsSearching}
      // isSearching={isSearching}
      // setIsCreating={setIsCreating}
      // isCreating={isCreating}
      // refreshTodos={refreshTodos}
      // setInputCreateValue={setInputCreateValue}
      // inputCreateValue={inputCreateValue}
      />
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
          dispatch(setCurrentTodoAction({ id, title }))
          return (
            <Todo
            // id={id}
            // title={title}
            // setInputUpdateValue={setInputUpdateValue}
            // isUpdating={isUpdating}
            // inputUpdateValue={inputUpdateValue}
            // updateTodo={updateTodo}
            // editingTodoId={editingTodoId}
            // startEditingTodo={startEditingTodo}
            // deleteTodo={deleteTodo}
            // isDeleting={isDeleting}
            />
          )
        })
      )}
    </div>
  )
}

export default TodoList
