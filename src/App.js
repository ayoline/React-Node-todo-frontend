import './App.css';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisibility(true);
  }

  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  }

  async function createTodo() {
    await axios.post("http://localhost:3333/todos", {
      name: inputValue
    });
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue('');
  }

  async function modifyStatusTodo(todo) {
    await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      name: todo.name,
      status: !todo.status
    });
    getTodos();
  }

  async function editTodo(todo) {
    await axios.put("http://localhost:3333/todos",
      {
        id: selectedTodo.id,
        name: inputValue
      });
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    setInputValue('');
  }

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    getTodos();
  }


  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  const Todos = ({ todos }) => {
    return (
      <div className='todos'>
        {todos.map((todo) => {
          return (
            <div className='todo'>
              <button
                onClick={() => modifyStatusTodo(todo)}
                className='checkbox'
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}>
              </button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='App'>
      <header className='container'>
        <div className='header'>
          <h1> Dont be Lazzy</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisibility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }} className='inputName'></input>
        <button
          onClick={
            inputVisibility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className='newTaskButton'>
          {inputVisibility ? "Confirm" : "+ New Task"}
        </button>
      </header>
    </div>
  );
}

export default App;
