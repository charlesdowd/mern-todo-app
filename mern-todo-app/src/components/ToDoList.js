import * as React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Todo({ todoObject }) {
    return (
        <tr>
            <td className={todoObject.todo_completed ? 'completed' : ''}>{todoObject.todo_description}</td>
            <td>{todoObject.todo_responsible}</td>
            <td>{todoObject.todo_priority}</td>
            <td>
                <Link to={"/edit/" + todoObject._id}>Edit</Link>
            </td>
        </tr>
    )
}



export default function ToDoList() {
    const [todoList, setTodoList] = React.useState([])

    function fetchTodos() {
        axios.get('http://localhost:4000/todos/')
            .then(res => {
                setTodoList(res.data)
            })
            .catch(err => {
                console.log('cannot get todos from db', err)
            })
    }

    React.useEffect(() => {
        fetchTodos()
        const interval = window.setInterval(() => {
            fetchTodos()
        }, 10000)

        return () => window.clearInterval(interval)
    }, []) 

    function todoListMapper() {
        return todoList.map((todo, i) => {
            return (
                <Todo todoObject={todo} key={todo._id} />
            )
        })
    }
    
    return (
        <div className='container'>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todoListMapper()}
                </tbody>
            </table>
        </div>
    )
}