import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ColorList from './ColorList';

test('renders ColorList without crashing', () => {
  const colors = ["red", "green", "blue"];
  const { getByText } = render(
    <MemoryRouter>
      <ColorList colors={colors} />
    </MemoryRouter>
  );

  expect(getByText("Welcome to the color factory.")).toBeInTheDocument();
  expect(getByText("red")).toBeInTheDocument();
  expect(getByText("green")).toBeInTheDocument();
  expect(getByText("blue")).toBeInTheDocument();
});
