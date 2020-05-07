import React, { Component } from 'react';
import './Rotas.css';

import Main from '../template/Main/Main';
import FullCalender from '../EventCalender';
import Nav from '../template/Nav/Nav';
import Logo from '../template/Logo/Logo';
import Footer from '../template/Footer/Footer';

const headerprops = {
	icon: 'truck',
	title: 'Rotas',
	subtitle: 'Vizualização das datas e rotas'
};

export default class Rotas extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-2">
					<Logo />
					<Nav />
				</div>
				<div className="col-10">
					<Main {...headerprops}>
						<FullCalender />
					</Main>
					<div className="fixed-bottom">
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}
