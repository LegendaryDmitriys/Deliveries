import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddDeliveryForm from '../pages/AddDeliveryForm';

test('Отображение формы', () => {
  const { getByPlaceholderText, getByText } = render(<AddDeliveryForm />);

  // Проверяем, что компонент отображается корректно
  expect(getByPlaceholderText('Продукт')).toBeInTheDocument();
  expect(getByPlaceholderText('Количество')).toBeInTheDocument();
  expect(getByPlaceholderText('Поставщик')).toBeInTheDocument();
  expect(getByPlaceholderText('Дата')).toBeInTheDocument();
  expect(getByPlaceholderText('Стоимость за штуку')).toBeInTheDocument();
  expect(getByText('Добавить')).toBeInTheDocument();
  
});

test('Отправка формы с действительными данными', () => {
  const { getByPlaceholderText, getByText } = render(<AddDeliveryForm />);

  // Заполняем поля формы
  fireEvent.change(getByPlaceholderText('Продукт'), { target: { value: 'Тестовый продукт' } });
  fireEvent.change(getByPlaceholderText('Количество'), { target: { value: '10' } });
  fireEvent.change(getByPlaceholderText('Поставщик'), { target: { value: 'Тестовый поставщик' } });
  fireEvent.change(getByPlaceholderText('Дата'), { target: { value: '2023-06-11' } });
  fireEvent.change(getByPlaceholderText('Стоимость за штуку'), { target: { value: '15' } });

  // Нажимаем на кнопку "Добавить"
  fireEvent.click(getByText('Добавить'));

  // Проверяем, что данные были отправлены и форма очищена
  expect(getByPlaceholderText('Продукт')).toHaveValue('');
  expect(getByPlaceholderText('Количество')).toHaveValue('');
  expect(getByPlaceholderText('Поставщик')).toHaveValue('');
  expect(getByPlaceholderText('Дата')).toHaveValue('');
  expect(getByPlaceholderText('Стоимость за штуку')).toHaveValue('');
});

test('Отправка формы с отсутствующими данными', () => {
  const { getByText } = render(<AddDeliveryForm />);

  // Нажимаем на кнопку "Добавить" без заполнения полей формы
  fireEvent.click(getByText('Добавить'));

});
