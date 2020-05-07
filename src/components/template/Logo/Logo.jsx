import './Logo.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/imgs/adb1.jfif';

export default (props) => (
	<Link to="/Home">
		<img src={logo} width={200} alt="Logo" />
	</Link>
);
