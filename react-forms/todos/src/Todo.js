import React, { useState } from "react";
import './TodoList.css';

const Todo = ({ id, handleRemove, item, update }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(item);

  const remove = () => handleRemove(id);

  const handleChange = (e) => {
    setEditItem(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    update(id, editItem);
    setIsEditing(false);
  };

  return (
    <div className="todo">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editItem}
            onChange={handleChange}
          />
          <button type="submit">Update!</button>
        </form>
      ) : (
        <>
          <span>{item}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button className="todo-button" onClick={remove}>X</button>
        </>
      )}
    </div>
  );
};

export default Todo;
