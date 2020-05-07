import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
	<aside className="menu-area">
		<nav className="menu">
			<Link to="/Home">
				<i className="fa fa-home" /> Inicio
			</Link>
			<Link to="/Clientes">
				<i className="fa fa-users" /> Usuarios
			</Link>
			<Link to="/rotas">
				<i className="fa fa-truck" /> Rotas
			</Link>
			<Link to="/Logout">
				<i className="fa fa-power-off" /> Sair
			</Link>
		</nav>
	</aside>
);
