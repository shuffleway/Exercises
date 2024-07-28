import React, { useState } from "react";
import './TodoList.css';

const NewTodoForm = ({ addTodo }) => {
  const initialState = { item: "" };
  const [formData, setFormData] = useState(initialState);
  const [idCounter, setIdCounter] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.item) {
      newErrors.item = "Todo item is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addTodo({ ...formData, id: idCounter });
      setIdCounter(idCounter + 1);
      setFormData(initialState);
      setErrors({});
    }
  };

  return (
    <div className="new-todo-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item">Add Todo: </label>
          <input 
            id="item"
            type="text"
            name="item"
            value={formData.item}
            onChange={handleChange}
          />
          <button>Add Todo</button>
          {errors.item && <div className="error">{errors.item}</div>}
        </div>  
      </form>
    </div>
  );
};

export default NewTodoForm;
