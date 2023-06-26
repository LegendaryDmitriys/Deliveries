import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Deliveries from './pages/Deliveries';

function App() {
  return (
    // Для перехода по страницам
    <Router>
      <div className="container">
        <h1 className="mt-4">Учет поставок</h1>
        <nav>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/deliveries" className="nav-link">
                Поставки
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/deliveries"
            element={
              <div>
                <Deliveries />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
