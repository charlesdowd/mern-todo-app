import * as React from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

export default function EditToDo() {
    const [todo, setTodo] = React.useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    })
    const { id } = useParams()
    const history = useHistory()

    React.useEffect(() => {
        axios.get(`http://localhost:4000/todos/${id}`)
            .then(res => {
                setTodo(res.data)
            })
            .catch(err => {
                console.log('error getting todo from db', err)
            })
    }, [id])

    const onChangeTodo = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    const onChangeTodoCompleted = (e) => {
        setTodo({
            ...todo,
            todo_completed: e.target.value === 'false' ? true : false
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const updatedTodo = {
            todo_description: todo.todo_description,
            todo_responsible: todo.todo_responsible,
            todo_priority: todo.todo_priority,
            todo_completed: todo.todo_completed
        }

        axios.post(`http://localhost:4000/todos/update/${id}`, updatedTodo)
            .then(res => {
                console.log(res.data)
                history.push('/')
            })
            .catch(err => {
                console.log('error updating todo in editTodos component', err)
            })
    }

    return (
        <div className='container'>
            <h3 align="center">Update Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        name="todo_description"
                        className="form-control"
                        value={todo.todo_description}
                        onChange={onChangeTodo}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input
                        type="text"
                        name="todo_responsible"
                        className="form-control"
                        value={todo.todo_responsible}
                        onChange={onChangeTodo}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="todo_priority"
                            id="priorityLow"
                            value="Low"
                            checked={todo.todo_priority === 'Low'}
                            onChange={onChangeTodo}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="todo_priority"
                            id="priorityMedium"
                            value="Medium"
                            checked={todo.todo_priority === 'Medium'}
                            onChange={onChangeTodo}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="todo_priority"
                            id="priorityHigh"
                            value="High"
                            checked={todo.todo_priority === 'High'}
                            onChange={onChangeTodo}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                        id="completedCheckbox"
                        type="checkbox"
                        name="todo_completed"
                        onChange={onChangeTodoCompleted}
                        checked={todo.todo_completed}
                        value={todo.todo_completed}
                    />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}