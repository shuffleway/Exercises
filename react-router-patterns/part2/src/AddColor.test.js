import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddColor from './AddColor';

test('renders AddColor and allows adding a color', () => {
  const addNewColor = jest.fn();
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <AddColor addNewColor={addNewColor} />
    </MemoryRouter>
  );

  const nameInput = getByLabelText("Color Name:");
  const colorInput = getByLabelText("Color Value:");
  const addButton = getByText("Add this Color");

  fireEvent.change(nameInput, { target: { value: 'purple' } });
  fireEvent.change(colorInput, { target: { value: '#800080' } });
  fireEvent.click(addButton);

  expect(addNewColor).toHaveBeenCalledWith({ name: 'purple', value: '#800080' });
});
