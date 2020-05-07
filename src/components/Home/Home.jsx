import React, { Component } from 'react';
import Main from '../template/Main/Main';
// import Grap from '../template/Grap/Grap';
import Nav from '../template/Nav/Nav';
import Logo from '../template/Logo/Logo';
import Footer from '../template/Footer/Footer';
import './Home.css';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/clientes';
const initialState = {
	user: {
		nome: '',
		proxColeta: ''
	},
	list: []
};
export default class Home extends Component {
	state = { ...initialState };
	componentWillMount() {
		const token = localStorage.getItem('token');
		axios(baseUrl, {
			headers: {
				Authorization: `bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then((resp) => {
			this.setState({ list: resp.data });
		});
	}
	test() {
		console.log(this.state.list);
	}
	renderTable() {
		return (
			<table className="table mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>Próximo Pagamento</th>
					</tr>
				</thead>
				<tbody>{this.renderRows()}</tbody>
			</table>
		);
	}
	renderRows() {
		const hoje = new Date();
		const semana = hoje.setDate(hoje.getDate() + 8);
		console.log(hoje.getTime());
		return this.state.list.map((user) => {
			let proxPag = new Date(user.proxPagamento);
			if (hoje.getTime() >= proxPag.getTime() || hoje.getTime() >= proxPag.getTime() >= semana) {
				user.proxColeta = user.proxColeta.split('T')[0];
				user.proxPagamento = user.proxPagamento.split('T')[0];
				return (
					<tr key={user.id}>
						<td>{user.id}</td>
						<td>{user.nome}</td>
						<td>{user.proxPagamento}</td>
					</tr>
				);
			}
		});
	}

	render() {
		return (
			<div className="row">
				<div className=" col-2">
					<Logo />
					<Nav />
				</div>
				<div className="col-10 ">
					<Main icon="home" title="Inicio" subtitle="Proximas Cobranças">
						<div className="pad">{this.renderTable()}</div>
					</Main>
					<div className="fixed-bottom">
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}
