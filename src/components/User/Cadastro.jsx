import React, { Component } from 'react';
import './Style.css';
import axios from 'axios';
import Main from '../template/Main/Main';
import Logo from '../template/Logo/Logo';
import Navv from '../template/Nav/Nav';
import Footer from '../template/Footer/Footer';
import MaskedInput from 'react-text-mask';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const headerProps = {
	icon: 'user',
	title: 'Cadastro',
	subtitle: 'Clientes'
};

const baseUrl = 'http://localhost:3001/clientes';
const initialState = {
	user: {
		id: '',
		nome: '',
		enderecoRua: '',
		enderecoNumero: '',
		enderecoComplemento: '',
		enderecoBairro: '',
		telefone: '',
		plano: '',
		intervalo: '',
		primPagamento: '',
		proxColeta: '',
		proxPagamento: ''
	},
	list: [],
	search: ''
};

export default class Cadastro extends Component {
	state = { ...initialState };

	DesMask(e, nome) {
		const user = this.state.user;
		switch (nome) {
			case 'telefone':
				let telefone = e.target.value;
				telefone = telefone.replace('(', '');
				telefone = telefone.replace(')', '');
				telefone = telefone.replace('-', '');
				user.telefone = telefone;
				this.setState({ user: user });
				break;
			default:
				break;
		}
	}

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
		console.log(this.state.list);
	}

	clear() {
		this.setState({ user: initialState.user });
		console.log(this.state.search);
	}

	save(props) {
		console.log(this.state.user);
		if (this.state.user.id) {
			const {
				id,
				nome,
				enderecoRua,
				enderecoNumero,
				enderecoComplemento,
				enderecoBairro,
				telefone,
				plano,
				intervalo,
				primPagamento,
				proxPagamento,
				proxColeta
			} = this.state.user;
			const cliente = {
				id,
				nome,
				enderecoRua,
				enderecoNumero,
				enderecoComplemento,
				enderecoBairro,
				telefone,
				plano,
				intervalo,
				primPagamento,
				proxPagamento,
				proxColeta
			};

			const method = 'put';
			const url = `${baseUrl}/${cliente.id}`;
			const token = localStorage.getItem('token');

			console.log(url);
			console.log(cliente);
			axios
				[method](url, cliente, {
					headers: {
						Authorization: `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					toast.success('Usuario Salvo com sucesso');
				})
				.catch((err) => toast.error('Prencha os campos'));
		} else {
			const {
				nome,
				enderecoRua,
				enderecoNumero,
				enderecoComplemento,
				enderecoBairro,
				telefone,
				plano,
				intervalo,
				primPagamento,
				proxPagamento,
				proxColeta
			} = this.state.user;
			const cliente = {
				nome,
				enderecoRua,
				enderecoNumero,
				enderecoComplemento,
				enderecoBairro,
				telefone,
				plano,
				intervalo,
				primPagamento,
				proxPagamento,
				proxColeta
			};

			const method = 'post';
			const url = baseUrl;
			const token = localStorage.getItem('token');
			axios
				[method](url, cliente, {
					headers: {
						Authorization: `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				.then((resp) => {
					toast.success('Usuario Salvo com sucesso');
				})
				.catch((err) => toast.error('Prencha os campos'));
		}
	}

	getUpdatedList(user, add = true) {
		const list = this.state.list.filter((u) => u.id !== user.id);
		if (add) list.unshift(user);
		return list;
	}

	updateField(event) {
		const user = { ...this.state.user };
		user[event.target.name] = event.target.value;
		this.setState({ user });
	}

	renderLink() {
		return (
			<Nav>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/Clientes">
						<button className="btn btn-success cortema">Clientes</button>{' '}
					</Link>
				</Nav.Item>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/ColetaPeso">
						<button className="btn btn-success cortema">Coleta/Peso</button>{' '}
					</Link>
				</Nav.Item>
				<Nav.Item style={{ padding: '10px' }}>
					<Link to="/Financeiro">
						<button className="btn btn-success cortema">Financeiro</button>{' '}
					</Link>
				</Nav.Item>
			</Nav>
		);
	}
	renderForm() {
		return (
			<div className="form ">
				<hr />
				<h6>Dados Pessoais</h6>
				<hr />
				<div className="row">
					<div style={{ width: '8%', padding: '0 15px' }}>
						<label>ID</label>
						<input
							type="submit"
							className="form-control"
							name="id"
							value={this.state.user.id}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '38%', padding: '0 15px' }}>
						<label>Nome</label>
						<input
							type="text"
							className="form-control"
							name="nome"
							value={this.state.user.nome}
							onChange={(e) => this.updateField(e)}
							placeholder="Digite o nome..."
						/>
					</div>
					<div style={{ width: '18%', padding: '0 15px' }}>
						<label>Telefone</label>
						<MaskedInput
							mask={[ '(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]}
							type="text"
							className="form-control"
							name="telefone"
							value={this.state.user.telefone}
							keepCharPositions={true}
							onChange={(e) => [ this.updateField(e), this.DesMask(e, 'telefone') ]}
						/>
					</div>
					<div style={{ width: '15%', padding: '0 15px' }}>
						<label>Plano</label>
						<input
							type="text"
							className="form-control"
							name="plano"
							value={this.state.user.plano}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '10%', padding: '0 15px' }}>
						<div className="form-group">
							<label>Intervalo</label>
							<input
								type="number"
								className="form-control"
								name="intervalo"
								value={this.state.user.intervalo}
								onChange={(e) => this.updateField(e)}
							/>
						</div>
					</div>
				</div>
				<hr />
				<h6>Endereço Residencial</h6>
				<hr />
				<div className="row">
					<div style={{ width: '36%', padding: '0 15px' }}>
						<label>Endereço</label>
						<input
							type="text"
							className="form-control"
							name="enderecoRua"
							value={this.state.user.enderecoRua}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '11%', padding: '0 15px' }}>
						<div className="form-group">
							<label>Número</label>
							<input
								type="text"
								className="form-control"
								name="enderecoNumero"
								value={this.state.user.enderecoNumero}
								onChange={(e) => this.updateField(e)}
							/>
						</div>
					</div>
					<div style={{ width: '15%', padding: '0 15px' }}>
						<div className="form-group">
							<label>Complemento</label>
							<input
								type="text"
								className="form-control"
								name="enderecoComplemento"
								value={this.state.user.enderecoComplemento}
								onChange={(e) => this.updateField(e)}
							/>
						</div>
					</div>
					<div style={{ width: '27%', padding: '0 15px' }}>
						<label>Bairro</label>
						<input
							type="text"
							className="form-control"
							name="enderecoBairro"
							value={this.state.user.enderecoBairro}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
				</div>
				<hr />
				<h6>Dados da Coleta</h6>
				<hr />
				<div className="row">
					<div style={{ width: '36%', padding: '0 15px' }}>
						<label>Data de adesão / Primeiro Pagamento</label>
						<input
							type="date"
							className="form-control"
							name="primPagamento"
							value={this.state.user.primPagamento}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '26%', padding: '0 15px' }}>
						<label>Próxima Coleta</label>
						<input
							type="date"
							className="form-control"
							name="proxColeta"
							value={this.state.user.proxColeta}
							onChange={(e) => this.updateField(e)}
						/>
					</div>
					<div style={{ width: '27%', padding: '0 15px' }}>
						<label>Próximo Pagamento</label>
						<input
							type="date"
							className="form-control"
							name="proxPagamento"
							value={this.state.user.proxPagamento}
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

	load(user) {
		this.setState({ user });
		console.log(this.state);
	}

	remove(user) {
		const token = localStorage.getItem('token');
		axios
			.delete(`${baseUrl}/${user.id}`, {
				headers: {
					Authorization: `bearer ${token}`,
					'Content-Type': 'application/json'
				}
			})
			.then((resp) => {
				const list = this.getUpdatedList(user, false);
				this.setState({ list });
				toast.success('Usuario Deletado com sucesso!');
			})
			.catch((err) => toast.error('Usuario possui dados em coletas e/ou financeiro'));
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
						<th>Nome</th>
						<th>Telefone</th>
						<th>Endereço</th>
						<th>Data de Adesão</th>
						<th>Próxima Coleta</th>
						<th>Próximo Pagamento</th>
					</tr>
				</thead>

				<tbody>{this.renderRows()}</tbody>
			</table>
		);
	}
	searchingFor(search) {
		return function(x) {
			return x.id.toLowerCase().includes(search.toLowerCase()) || !search;
		};
	}

	renderRows() {
		console.log(this.state.list);
		return this.state.list.filter(this.searchingFor(this.state.search)).map((user) => {
			const Msg = ({ closeToast }) => (
				<div>
					Tem certeza que deseja deletar a coleta?<br />
					<button onClick={() => this.remove(user)}> Sim </button>
					<button onClick={closeToast}>Cancela</button>
				</div>
			);
			user.primPagamento = user.primPagamento.split('T')[0];
			user.proxColeta = user.proxColeta.split('T')[0];
			user.proxPagamento = user.proxPagamento.split('T')[0];
			return (
				<tr key={user.id}>
					<td>{user.id}</td>
					<td>{user.nome}</td>
					<td>{user.telefone}</td>
					<td>
						{user.enderecoRua}, {user.enderecoNumero}, {user.enderecoComplemento} ,{user.enderecoBairro}
					</td>
					<td>{user.primPagamento}</td>
					<td>{user.proxColeta}</td>
					<td>{user.proxPagamento}</td>

					<td>
						<button className="btn btn-warning" onClick={() => this.load(user)}>
							<i className="fa fa-pencil" />
						</button>
						<button className="btn btn-danger mt-2" onClick={() => toast(<Msg />)}>
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
