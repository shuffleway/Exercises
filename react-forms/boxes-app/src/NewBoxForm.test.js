import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

// Mock createBox function
const createBox = jest.fn();

describe("NewBoxForm Component", () => {
  beforeEach(() => {
    createBox.mockClear();
  });

  test("renders without crashing", () => {
    render(<NewBoxForm createBox={createBox} />);
  });

  test("displays validation errors for empty fields", () => {
    render(<NewBoxForm createBox={createBox} />);

    fireEvent.click(screen.getByText(/add a new box!/i));

    expect(screen.getByText("Height must be a positive number.")).toBeInTheDocument();
    expect(screen.getByText("Width must be a positive number.")).toBeInTheDocument();
    expect(screen.getByText("Background color is required.")).toBeInTheDocument();
    expect(createBox).not.toHaveBeenCalled();
  });

  test("displays validation errors for invalid data", () => {
    render(<NewBoxForm createBox={createBox} />);

    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: "-10" } });
    fireEvent.change(screen.getByLabelText(/width/i), { target: { value: "abc" } });
    fireEvent.change(screen.getByLabelText(/background color/i), { target: { value: "red" } });
    fireEvent.click(screen.getByText(/add a new box!/i));

    expect(screen.getByText("Height must be a positive number.")).toBeInTheDocument();
    expect(screen.getByText("Width must be a positive number.")).toBeInTheDocument();
    expect(createBox).not.toHaveBeenCalled();
  });

  test("submits the form with valid data", () => {
    render(<NewBoxForm createBox={createBox} />);

    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/width/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/background color/i), { target: { value: "red" } });
    fireEvent.click(screen.getByText(/add a new box!/i));

    expect(createBox).toHaveBeenCalledTimes(1);
    expect(createBox).toHaveBeenCalledWith({
      height: "100",
      width: "100",
      backgroundColor: "red",
      id: expect.any(Number)
    });

    // Ensure form fields are reset after submission
    expect(screen.getByLabelText(/height/i).value).toBe("");
    expect(screen.getByLabelText(/width/i).value).toBe("");
    expect(screen.getByLabelText(/background color/i).value).toBe("");
  });
});
