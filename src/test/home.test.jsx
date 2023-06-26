import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages/Home';

describe('Компонент главная', () => {
  it('Отображаение приветственного сообщения', () => {
    const { getByText } = render(<Home />);
    const welcomeMessage = getByText(/добро пожаловать/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
