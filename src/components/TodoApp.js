import React, { useState } from 'react';
import uuid from 'react-uuid';
import Items from './Items';
import styled from 'styled-components'

const TodoApp = styled(({className}) => {
    const [value, setValue] = useState('')
    const [newItem, setNewItem] = useState('')

    const [todos, setTodos] = useState([])


    const handleAddTodo = () => {
        let newArr = [...todos, {
            id: uuid(),
            name: value,
            items: []
        }]
        setTodos(newArr)
        setValue('')
    }
    const handleTodoDelete = (i) => {
        let newArr = [...todos]
        if(newArr !== -1){
            newArr.splice(i, 1)
            setTodos(newArr)
        }
    }


    const addItem = (todo) =>{
        let newArr = [...todos]
        const foundIndex = newArr.findIndex((other) => other.id === todo.id)

        newArr[foundIndex].items = [...newArr[foundIndex].items, {
            id: uuid(),
            name: newItem
        }];
        setTodos(newArr)
        setNewItem('')
    }

    const handleDelete = (id, value) => {
        let newArr = [...todos]
        console.log(id)
        console.log(value)
        // const foundIndex = newArr.findIndex((other) => other.id === todos[i].id)
    
        newArr[value].items.splice(id, 1)
        setTodos(newArr)
    }

    return ( 
        <div className={className}>
            <div className="create-item">
                <h1>Todo Manager</h1>
                <div className="add-todo">
                    <input
                    type="text"
                    placeholder="List Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    />
                    <button onClick={handleAddTodo}>Create New List</button>
                </div>
            </div>
            <div className="todos">
                {todos.map((todo, i) => {
                    return(
                        <div className="todo" key={todo.id}>
                            <div className="todo-info">
                                <p>{todo.name}</p>
                                <button onClick={() => handleTodoDelete(i)}>X</button>
                            </div>

                                <Items data={todos} value={i} handleDelete={handleDelete}/>
                                
                            <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
                            <button onClick={() => addItem(todo)}>Add Item</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
})`
    .create-item{
        display: flex;
        flex-direction: row;
        background: #333;
        padding: 0 50px;
        height: 65px;
        align-items: center;
        justify-content: space-between;
    }
    h1{color: #fefefe;}
    .add-todo{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-todo input{
        border: none;
        height: 36px;
        padding: 10px 20px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .add-todo button{
        padding: 11px 20px;
        border: none;
        background: #444;
        color: #fefefe;
        border-radius: 5px;
    }


    .todos{
        width: auto;
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 50px;
    }

    .todo{
        background: #333;
        width: 285px;
        margin-top: 30px;
        margin-right: 20px;
        display:flex;
        flex-direction: column;
        padding: 30px;
        color: #fefefe;
    }


    .todo-info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`
 
export default TodoApp;