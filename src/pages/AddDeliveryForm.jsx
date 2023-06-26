import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddDeliveryForm({ onAddDelivery }) {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');


  // Добавление новой поставки
  const addDelivery = async (product, quantity, supplier, date, price, status) => {
    try {
      const response = await fetch('http://192.168.0.104/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product,
          quantity: quantity,
          supplier: supplier,
          date: date,
          price: price,
          status: 'В ожидании',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onAddDelivery();
      } else {
        console.error('Ошибка при добавлении поставки', response.status);
      }
    } catch (error) {
      console.error('Ошибка при добавлении поставки', error);
    }
  };


  // Кнопка для отправки формы  "Добавление поставки"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product && quantity && supplier && date && price) {
      addDelivery(product, quantity, supplier, date, price);
      setProduct('');
      setQuantity('');
      setSupplier('');
      setDate('');
      setPrice('');
    }
  };

  // Ограничение ввода букв в input стоимости
  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    // Удалить все символы, кроме цифр
    const cleanPrice = inputPrice.replace(/\D/g, '');
    setPrice(cleanPrice);
  };

// Ограничение ввода букв в input количества
  const handleQuantityChange = (e) => {
    const inputQuantity = e.target.value;
    // Удалить все символы, кроме цифр
    const cleanQuantity = inputQuantity.replace(/\D/g, '');
    setQuantity(cleanQuantity);
  };


  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2>Добавить поставку</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Продукт"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Количество"
          value={quantity}
          onChange={handleQuantityChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Поставщик"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          placeholder="Дата"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Стоимость за штуку"
          value={price}
          onChange={handlePriceChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Добавить
      </button>
    </form>
  );
}

export default AddDeliveryForm;
