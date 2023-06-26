<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


// Установите параметры подключения к базе данных
$host = 'localhost';
$dbname = 'Deliveries';
$user = 'Admin';
$password = 'Admin';

// Установите соединение с базой данных
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

// Проверка соединения с базой данных
if (!$conn) {
    die("Ошибка подключения к базе данных");
}

// Обработка запроса на добавление поставки
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $product = isset($requestData['product']) ? $requestData['product'] : '';
    $quantity = isset($requestData['quantity']) ? intval($requestData['quantity']) : 0;
    $supplier = isset($requestData['supplier']) ? $requestData['supplier'] : '';
    $date = isset($requestData['date']) ? $requestData['date'] : '';
    $price = isset($requestData['price']) ? intval($requestData['price']) : 0;

    if (!empty($product) && $quantity > 0 && $price >= 0) {
        // Вставка новой поставки в базу данных
        $query = "INSERT INTO deliveries (product, quantity, supplier, date, status, price) 
              VALUES ('$product', $quantity, '$supplier', '$date', 'В ожидании', $price)";
        $result = pg_query($conn, $query);

        if ($result) {
            echo json_encode(array('message' => 'Поставка успешно добавлена'));
        } else {
            echo json_encode(array('message' => 'Ошибка при добавлении поставки'));
        }
    } else {
        echo "Некорректные данные поставки";
    }
}

// Обработка запроса на удаление поставки
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $id = isset($requestData['id']) ? intval($requestData['id']) : 0;

    if ($id > 0) {
        // Удаление поставки из базы данных
        $query = "DELETE FROM deliveries WHERE id = $id";
        $result = pg_query($conn, $query);

        if ($result) {
            echo json_encode(array('message' => 'Поставка успешно удалена'));
        } else {
            echo json_encode(array('message' => 'Ошибка при удалении поставки'));
        }

    } else {
        echo "ID поставки не указан или некорректный";
    }
}

// Обработка запроса на изменение статуса
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $id = isset($requestData['id']) ? intval($requestData['id']) : 0;
    $newStatus = isset($requestData['status']) ? $requestData['status'] : '';

    if ($id > 0 && !empty($newStatus)) {
        // Обновление статуса поставки в базе данных
        $query = "UPDATE deliveries SET status = '$newStatus' WHERE id = $id";
        $result = pg_query($conn, $query);

        if ($result) {
            echo json_encode(array('message' => 'Статус успешно изменен'));
        } else {
            echo json_encode(array('message' => 'Ошибка при изменении статуса'));
        }

    } else {
        echo "Некорректные данные для изменения статуса";
    }
}

// Обработка запроса на получение списка поставок
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Получение списка поставок из базы данных
    $query = "SELECT * FROM deliveries";
    $result = pg_query($conn, $query);

    if ($result) {
        $deliveries = pg_fetch_all($result);
        echo json_encode($deliveries);
    } else {
        echo "Ошибка при получении списка поставок";
    }
}

// Закрытие соединения с базой данных
pg_close($conn);

?>