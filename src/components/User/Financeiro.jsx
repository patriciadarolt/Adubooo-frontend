import React, { Component } from 'react';
import './Style.css';
import axios from 'axios';

import Main from '../template/Main/Main';
import Logo from '../template/Logo/Logo';
import Navv from '../template/Nav/Nav';
import Footer from '../template/Footer/Footer';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerProps = {
	icon: 'user',
	title: 'Cadastro',
	subtitle: 'Financeiro'
};

const baseUrl = 'http://localhost:3001/financeiro';
const initialState = {
	user3: {
		id: '',
		clienteId: '',
		nomeCliente: '',
		dataPagamento: '',
		valor: ''
	},
	list: [],
	search: ''
};

export default class Financeiro extends Component {
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

	clear() {
		this.setState({ user3: initialState.user3 });
	}

	save() {
		console.log(this.state.user3);
		if (this.state.user3.id) {
			console.log(this.state.user3);
			const { id, clienteId, dataPagamento, valor } = this.state.user3;
			const financeiro = { id, clienteId, dataPagamento, valor };

			const method = 'put';
			const url = `${baseUrl}/${financeiro.id}`;
			const token = localStorage.getItem('token');

			console.log(url);
			console.log(financeiro);
			axios
				[method](url, financeiro, {
					headers: {
						Authorization: `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					toast.success('Financeiro Salvo!');
				})
				.catch((err) => toast.error('Erro ao salvar financeiro!'));
		} else {
			const { clienteId, dataPagamento, valor } = this.state.user3;
			const financeiro = { clienteId, dataPagamento, valor };

			const method = 'post';
			const url = baseUrl;
			const token = localStorage.getItem('token');

			axios
				[method](url, financeiro, {
					headers: {
						Authorization: `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					toast.success('Financeiro Salvo!');
				})
				.catch((err) => toast.error('Error ao salvar o financerio!'));
		}
	}

	getUpdatedList(user3, add = true) {
		const list = this.state.list.filter((u) => u.id !== user3.id);
		if (add) list.unshift(user3);
		return list;
	}

	updateField(event) {
		const user3 = { ...this.state.user3 };
		user3[event.target.name] = event.target.value;
		this.setState({ user3 });
	}

	renderLink() {
		return (
			<Nav>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/Clientes">
						<button className="btn btn-success cortema">Clientes</button>
					</Link>
				</Nav.Item>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/ColetaPeso">
						<button className="btn btn-success cortema">Coleta/Peso</button>
					</Link>
				</Nav.Item>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/Financeiro">
						<button className="btn btn-success cortema">Financeiro</button>
					</Link>
				</Nav.Item>
			</Nav>
		);
	}

	renderForm() {
		return (
			<div className="form">
				<hr />
				<h6>Dados Financeiros</h6>
				<hr />
				<div className="row">
					<div style={{ width: '8%', padding: '0 15px' }}>
						<label>ID</label>
						<input
							type="submit"
							className="form-control"
							name="id"
							value={this.state.user3.id}
							onChange={(e) => this.updateField(e)}
							disabled={true}
						/>
					</div>
					<div style={{ width: '10%', padding: '0 15px' }}>
						<label>ID Cliente</label>
						<input
							type="text"
							className="form-control"
							name="clienteId"
							value={this.state.user3.clienteId}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '35%', padding: '0 15px' }}>
						<label>Nome</label>
						<input
							type="submit"
							className="form-control"
							name="nomeCliente"
							value={this.state.user3.nomeCliente}
							onChange={(e) => this.updateField(e)}
							placeholder="Digite o nome..."
							disabled={true}
						/>
					</div>
					<div style={{ width: '20%', padding: '0 15px' }}>
						<label>Data do Pagamento</label>
						<input
							type="date"
							className="form-control"
							name="dataPagamento"
							value={this.state.user3.dataPagamento}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '15%', padding: '0 15px' }}>
						<label>Valor</label>
						<input
							type="number"
							min="1"
							step="any"
							className="form-control"
							name="valor"
							value={this.state.user3.valor}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12 d-flex justify-content-end">
						<input
							onChange={(e) => this.onchange(e.target.value)}
							value={this.state.search}
							placeholder="Buscar..."
						/>
						<button className="btn btn-success" onClick={(e) => this.save(e)}>
							Salvar
						</button>

						<button className="btn btn-secondary ml-2" onClick={(e) => this.clear(e)}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		);
	}
	load(user3) {
		this.setState({ user3 });
	}

	remove(user3) {
		const token = localStorage.getItem('token');
		axios
			.delete(`${baseUrl}/${user3.id}`, {
				headers: {
					Authorization: `bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})
			.then((resp) => {
				const list = this.getUpdatedList(user3, false);
				this.setState({ list });
				toast.success('Financeiro Removido com sucesso!');
			})
			.catch((err) => toast.error('Erro ao salvar financeiro!'));
	}

	onchange(e) {
		const n = e;
		console.log(n);
		console.log(this.state.search);

		this.setState(
			{
				search: n
			},
			() => {
				console.log(this.state.search);
			}
		);
	}
	searchHandler(e) {
		console.log(this.state.list);
	}
	searchingFor(search) {
		return function(x) {
			return x.id.toString().toLowerCase().includes(search.toLowerCase()) || !search;
		};
	}

	renderRows() {
		return this.state.list.filter(this.searchingFor(this.state.search)).map((user3) => {
			const Msg = ({ closeToast }) => (
				<div>
					Tem certeza que deseja deletar o financeiro?<br />
					<button onClick={() => this.remove(user3)}> Sim </button>
					<button onClick={closeToast}>Cancela</button>
				</div>
			);
			console.log(user3.dataPagamento);
			user3.dataPagamento = user3.dataPagamento.split('T')[0];
			console.log(user3.dataPagamenento);

			return (
				<tr key={user3.id}>
					<td>{user3.id}</td>
					<td>{user3.clienteId}</td>
					<td>{user3.nomeCliente}</td>
					<td>{user3.dataPagamento}</td>
					<td>R$: {user3.valor}</td>
					<td>
						<button className="btn btn-warning" onClick={() => this.load(user3)}>
							<i className="fa fa-pencil" />
						</button>
						<button className="btn btn-danger ml-2" onClick={() => toast(<Msg />)}>
							<i className="fa fa-trash" />
						</button>
					</td>
				</tr>
			);
		});
	}
	renderTable() {
		return (
			<table className="table mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>ID Cliente</th>
						<th>Nome</th>
						<th>Data do Pagamento</th>
						<th>Valor (R$)</th>
					</tr>
				</thead>
				<tbody>{this.renderRows()}</tbody>
			</table>
		);
	}

	render() {
		return (
			<div className="row">
				<ToastContainer />
				<div className="col-2">
					<Logo />
					<Navv />
				</div>
				<div className="col-10">
					<Main {...headerProps}>
						{this.renderLink()}
						{this.renderForm()}
						{this.renderTable()}
					</Main>
					<div className="fixed-bottom">
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}
