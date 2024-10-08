import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    // Declaring the state and setting the result to local storage
    const [todoList, setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])
    
    const inputRef = useRef();

    const addTask = () => {
        const inputText = inputRef.current.value.trim();

        if ( inputText === "") {
            return null;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }

        setTodoList( (prevList) => [...prevList, newTodo]);
        inputRef.current.value = '';
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodo) => {
            return prevTodo.filter((todo) => todo.id !== id)
        })
    }

    const toggleTodo = (id) => {
        setTodoList( (prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, isComplete: !todo.isComplete}
                }

                return todo;
            })
        })
    }

    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

            {/* Title */}
            
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold '>Todo List</h1>
            </div>

            {/* Input Box */}

            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
                <button onClick={addTask} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointers'>Add Task</button>
            </div>

            {/* Todo List */}

            <div>

                { todoList.map((list, index) => {
                    return <TodoItems key={index} text={list.text} id={list.id} isComplete={list.isComplete} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
                }) }
            </div>

        </div>
    )
}

export default Todo
