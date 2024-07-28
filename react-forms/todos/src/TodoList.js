import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedItem) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, item: updatedItem } : todo)));
  };

  const todoComponents = todos.map((todo) => (
    <li key={todo.id}>
      <Todo 
        id={todo.id} 
        item={todo.item} 
        handleRemove={removeTodo} 
        update={updateTodo}
      />
    </li>
  ));

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>
      <NewTodoForm addTodo={addTodo} />
      <ul className="todo-list">
        {todoComponents}
      </ul>
    </div>
  );
};

export default TodoList;
