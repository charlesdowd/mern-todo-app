import * as React from 'react'
import axios from 'axios'

export default function CreateToDo() {
    const [todo, setTodo] = React.useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    })

    // when the form input changes, update the current todo's state
    const onChangeTodo = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    const onChangePriority = (e) => {
        setTodo({
            ...todo,
            todo_priority: e.target.value
        })
    }

    // log results and clear the current toDo's state 
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('Form Submitted')

        console.log('To Do description: ', todo.todo_description)
        console.log('To Do responsible: ', todo.todo_responsible)
        console.log('To Do priority: ', todo.todo_priority)

        const newTodo = {
            todo_description: todo.todo_description,
            todo_responsible: todo.todo_responsible,
            todo_priority: todo.todo_priority,
            todo_completed: todo.todo_completed
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data))

        setTodo({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    return (
        <div className='container' style={{ marginTop: 10 }}>
            <h3>Create New Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        className="form-control"
                        name="todo_description"
                        value={todo.todo_description}
                        onChange={onChangeTodo}
                    />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="todo_responsible"
                        value={todo.todo_responsible}
                        onChange={onChangeTodo}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={todo.todo_priority === 'Low'}
                            onChange={onChangePriority}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={todo.todo_priority === 'Medium'}
                            onChange={onChangePriority}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={todo.todo_priority === 'High'}
                            onChange={onChangePriority}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}