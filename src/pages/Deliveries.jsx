import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddDeliveryForm from './AddDeliveryForm';

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  // Хук для отрисовки списка поставок
  useEffect(() => {
    fetchDeliveries();
  }, []);


 // Получение списка поставок из базы данных
  const fetchDeliveries = async () => {
    try {
      const response = await fetch('http://192.168.0.104/api.php');
      const data = await response.json();
      if (Array.isArray(data)) {
        setDeliveries(data);
      } else {
        console.error('Неверный формат данных: ожидался массив', data);
      }
    } catch (error) {
      console.error('Ошибка при получении списка поставок', error);
    }
  };

  // Обновление статуса
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch('http://192.168.0.104/api.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: newStatus,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchDeliveries();
    } catch (error) {
      console.error('Ошибка при изменении статуса', error);
    }
  };

  // Удаление поставки
  const deleteDelivery = async (id) => {
    try {
      const response = await fetch('http://192.168.0.104/api.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      console.log(data);
      fetchDeliveries();
    } catch (error) {
      console.error('Ошибка при удалении поставки', error);
    }
  };

  const sortedDeliveries = deliveries.sort((a, b) => a.product.localeCompare(b.product));


  // Пропс для AddDeliveryForm для обновления списка поставок при добавлении новой поставки
  const handleAddDelivery = () => {
    fetchDeliveries(); 
  };

  return (
    <div>
      <h2 className="mt-4">Поставки</h2>
      <ul className="list-group">
        {sortedDeliveries.map((delivery) => (
          <li key={delivery.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                {delivery.product} ({delivery.quantity} шт.) {delivery.supplier} {delivery.date} Cтоимость: {delivery.price * delivery.quantity} ₽
              </span>
              <div>
                <button onClick={() => deleteDelivery(delivery.id)} className="btn btn-danger me-2">
                  Удалить
                </button>
                <select
                  value={delivery.status}
                  onChange={(e) => updateStatus(delivery.id, e.target.value)}
                  className={`form-select ${
                    delivery.status === 'Отклонено'
                      ? 'bg-danger text-white'
                      : delivery.status === 'В ожидании'
                      ? 'bg-warning text-white'
                      : delivery.status === 'В пути'
                      ? 'bg-info text-white'
                      : delivery.status === 'Доставлено'
                      ? 'bg-success text-white'
                      : ''
                  }`}
                >
                  <option className="bg-secondary" value="Отклонено">
                    Отклонено
                  </option>
                  <option className="bg-secondary" value="В ожидании">
                    В ожидании
                  </option>
                  <option className="bg-secondary" value="В пути">
                    В пути
                  </option>
                  <option className="bg-secondary" value="Доставлено">
                    Доставлено
                  </option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
      <AddDeliveryForm onAddDelivery={handleAddDelivery} />
        </div>
    </div>
  );
  
}


export default Deliveries;
