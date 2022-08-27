import { useReducer,useEffect } from 'react';
import { todoReducer } from '../components/todoReducer';


export const useTodo = () => {

    const init = () => {
        return JSON.parse( localStorage.getItem('todos')) || [];  
    }
    
    const [todos, dispatch] = useReducer( todoReducer, [], init );


    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    },[todos])

    const onNewTodo = (todo) => {
        const action ={
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);
    }

    const onDeleteTodo = (todoId) => {
        const action = {
            type: '[TODO] Delete Todo',
            payload: todoId
        }
        dispatch(action);
    }

    const onToggleTodo = (todoId) => {
        const action = {
            type: '[TODO] Done Todo',
            payload: todoId
        }
        dispatch(action);
    }

    const todosCount = todos.length;
    const pendingTodosCount = todos.filter( todo => !todo.done).length;

    return {
         todos,
         onDeleteTodo,
         onToggleTodo,
         onNewTodo,
         todosCount,
         pendingTodosCount
    }
}