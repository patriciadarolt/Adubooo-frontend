import './Footer.css';
import React from 'react';

var data = new Date();
var dia = data.getDate();
var mes = data.getMonth();
var ano4 = data.getFullYear();
var str_data = dia + '/' + (mes + 1) + '/' + ano4;

export default (props) => (
	<footer className="footer">
		<span>&copy;Adubbo {str_data}</span>
	</footer>
);
