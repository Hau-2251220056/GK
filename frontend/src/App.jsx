import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './About';
import Items from './Items';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Dự Án DevOps Nhỏ</h1>
          <nav className="nav">
            <a href="/about">Về Tôi</a>
            <a href="/items">Danh Sách</a>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/items" element={<Items />} />
            <Route path="/" element={<Navigate to="/about" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
