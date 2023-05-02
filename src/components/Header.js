import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (

    <div className="Encabezado">

      <div className="RecuadroLogo">
        <h1><b className="Logo_Text">MyFlowersList</b></h1>
        <img className='Logo_Img' src='./img/Icono.png' alt='Textp'></img>
      </div>

      <div className="menu">
        <nav>
          <ul>
            <li>
              <Link to="/Inicio" className="no-underline black">
                Inicio
              </Link>
            </li>

            <li>
              <Link to="/dinosaurios" className="no-underline black">
                Mostrar Datos
              </Link>
            </li>

            <li>
              <Link to="/add" className="no-underline black" >
                Agregar Datos
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  );
};

export default Header;