import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", function() {
  render(<NewTodoForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

// it("runs the create function on form submit", function() {
//   const createMock = jest.fn();
//   const { getByText } = render(<NewTodoForm addTodo={createMock} />);
//   const createButton = getByText("Add Todo!");
//   fireEvent.click(createButton);
//   expect(createMock).toHaveBeenCalled();
// });



it("runs the create function on form submit", function() {
  const addTodoMock = jest.fn();
  const { getByText, getByLabelText } = render(<NewTodoForm addTodo={addTodoMock} />);
  
  // Fill the input field
  const input = getByLabelText("Add Todo:");
  fireEvent.change(input, { target: { value: "Test Todo" } });
  
  // Submit the form
  const createButton = getByText("Add Todo");
  fireEvent.submit(createButton.closest('form'));
  
  expect(addTodoMock).toHaveBeenCalled();
});
