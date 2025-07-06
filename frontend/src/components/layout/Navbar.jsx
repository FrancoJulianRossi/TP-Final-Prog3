import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Sistema de Inventario</h2>
      <ul className="navbar-links">
        <li className={pathname === '/productos' ? 'active' : ''}>
          <Link to="/productos">Productos</Link>
        </li>
        <li className={pathname === '/categorias' ? 'active' : ''}>
          <Link to="/categorias">Categorías</Link>
        </li>
        <li className={pathname === '/movimientos' ? 'active' : ''}>
          <Link to="/movimientos">Movimientos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;