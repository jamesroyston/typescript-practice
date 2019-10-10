import React, { useState } from 'react';
import './App.css';

interface TodoProps {
  todo: {
    text: string
    isComplete: boolean
  }
  completeTodo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  deleteTodo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  key: number
} //i have no idea what the fuck i'm doing with this interface lmao

// ok so interfaces simply describe the types for a given object or return value



const Todo: React.FC<TodoProps> = (props) => {
  const {completeTodo, deleteTodo, todo} = props

  return <div
    className="todo"
    style={{ textDecoration: todo.isComplete ? 'line-through' : '' }}
  >
    {todo.text}
    <button
      onClick={completeTodo}
    >
      complete
      </button>
    <button
      onClick={deleteTodo}
    >
      X
      </button>
  </div>
}


const TodoForm: React.FC<{ addTodo: (text: string) => void; }> = (props) => {

  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) return;
    props.addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

const App: React.FC = () => {

  // similar to this.state inside of a constructor
  const [todos, setTodos] = useState([
    { text: 'sup', isComplete: false },
    { text: 'hi', isComplete: false },
    { text: 'whatsup', isComplete: false }
  ])

  // similar to methods on the class
  const addTodo = (text: string) => {
    const newTodos = [...todos, { text, isComplete: false }]
    setTodos(newTodos)
    // similar to setState but specifically based on the first useState hook
  }

  // another 'class' method we pass via props
  const completeTodo = (index: number) => {
    const newTodos = [...todos]
    // copy current state of todos
    newTodos[index].isComplete = true
    // set selected todo to complete in state
    setTodos(newTodos)
    // call 'setState' with new todo list
  }

  const deleteTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  // similar to how you can do this inside of a render() before the return...
  // if you did this inside of the return in a functional component
  // you would need to wrap the function in {}
  const todoItems = todos.map((todo, index) => {
    return <Todo
      key={index}
      todo={todo}
      completeTodo={() => completeTodo(index)}
      deleteTodo={() => deleteTodo(index)}
    />
  })

  return (
    <div className="app">
      <div className="todo-list">
        {todoItems} {/**normal shit */}
        <TodoForm
          addTodo={addTodo}
        />
      </div>
    </div>
  )

}

export default App;
