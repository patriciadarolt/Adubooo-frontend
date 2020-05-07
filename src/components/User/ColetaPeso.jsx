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
	subtitle: 'Coleta/Peso'
};

const baseUrl = 'http://localhost:3001/coleta';
const initialState = {
	user2: {
		id: '',
		clienteId: '',
		nomeCliente: '',
		dataColeta: '',
		peso: 0
	},
	list: [],
	search: ''
};

export default class ColetaPeso extends Component {
	state = { ...initialState };

	componentWillMount() {
		const token = localStorage.getItem('token');
		axios(baseUrl, {
			headers: {
				Authorization: `bearer ${token}`
			}
		}).then((resp) => {
			this.setState({ list: resp.data });
		});
	}

	clear() {
		this.setState({ user2: initialState.user2 });
	}

	save() {
		if (this.state.user2.id) {
			console.log(this.state.user2);
			const { id, clienteId, dataColeta, peso } = this.state.user2;

			const coleta = { id, clienteId, dataColeta, peso };

			const token = localStorage.getItem('token');

			const method = 'put';

			const url = `${baseUrl}/${coleta.id}`;

			console.log(url);
			console.log(coleta);
			axios
				[method](url, coleta, {
					headers: {
						Authorization: `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					toast.success('Coleta salva!');
				})
				.catch((err) => toast.error('Error ao salvar a coleta!'));
		} else {
			console.log(this.state.user2);
			const { clienteId, dataColeta, peso } = this.state.user2;
			const coleta = { clienteId, dataColeta, peso };

			const method = 'post';
			const url = baseUrl;
			const token = localStorage.getItem('token');

			axios
				[method](url, coleta, {
					headers: {
						Authorization: `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					toast.success('Usuario Salvo com sucesso');
				})
				.catch((err) => toast.error('Error ao salvar a coleta!'));
		}
	}

	getUpdatedList(user2, add = true) {
		const list = this.state.list.filter((u) => u.id !== user2.id);
		if (add) list.unshift(user2);
		return list;
	}

	updateField(event) {
		const user2 = { ...this.state.user2 };
		user2[event.target.name] = event.target.value;

		this.setState({ user2 });
		console.log(event.target.name);
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
						{' '}
						<button className="btn btn-success cortema">Coleta/Peso</button>
					</Link>
				</Nav.Item>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/Financeiro">
						{' '}
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
				<h6>Dados da Coleta e do Peso</h6>
				<hr />
				<div className="row">
					<div style={{ width: '8%', padding: '0 15px' }}>
						<label>ID</label>
						<input
							type="submit"
							className="form-control"
							name="id"
							value={this.state.user2.id}
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
							value={this.state.user2.clienteId}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '30%', padding: '0 15px' }}>
						<label>Nome</label>
						<input
							type="text"
							className="form-control"
							name="nomeCliente"
							value={this.state.user2.nomeCliente}
							onChange={(e) => this.updateField(e)}
							placeholder="Digite o nome..."
							disabled={true}
						/>
					</div>
					<div style={{ width: '20%', padding: '0 15px' }}>
						<label>Data da Coleta</label>
						<input
							type="date"
							className="form-control"
							name="dataColeta"
							value={this.state.user2.dataColeta}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '15%', padding: '0 15px' }}>
						<label>Peso</label>
						<input
							type="text"
							className="form-control"
							name="peso"
							value={this.state.user2.peso}
							placeholder="000"
							keepCharPositions={true}
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

	load(user2) {
		this.setState({ user2 });
	}

	remove(user2) {
		const token = localStorage.getItem('token');
		axios
			.delete(`${baseUrl}/${user2.id}`, {
				headers: {
					Authorization: `bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})
			.then((resp) => {
				const list = this.getUpdatedList(user2, false);
				this.setState({ list });
				toast.success('Coleta deletada com sucesso');
			});
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
	renderTable() {
		return (
			<table className="table mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>ID Cliente</th>
						<th>Nome</th>
						<th>Data da Coleta</th>
						<th>Peso (Kg)</th>
					</tr>
				</thead>
				<tbody>{this.renderRows()}</tbody>
			</table>
		);
	}

	searchingFor(search) {
		return function(x) {
			return x.id.toString().toLowerCase().includes(search.toLowerCase()) || !search;
		};
	}

	renderRows() {
		console.log(this.state.list);

		return this.state.list.filter(this.searchingFor(this.state.search)).map((user2) => {
			const Msg = ({ closeToast }) => (
				<div>
					Tem certeza que deseja deletar a coleta?<br />
					<button onClick={() => this.remove(user2)}> Sim </button>
					<button onClick={closeToast}>Cancela</button>
				</div>
			);

			console.log(user2.dataColeta);
			user2.dataColeta = user2.dataColeta.split('T')[0];
			console.log(user2.dataColeta);

			return (
				<tr key={user2.id}>
					<td>{user2.id}</td>
					<td>{user2.clienteId}</td>
					<td>{user2.nomeCliente}</td>
					<td>{user2.dataColeta}</td>
					<td>{user2.peso}</td>
					<td>
						<button className="btn btn-warning" onClick={() => this.load(user2)}>
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
