import React, { Component } from 'react';
import Main from '../template/Main/Main';
import Nav from '../template/Nav/Nav';
import Logo from '../template/Logo/Logo';
import Footer from '../template/Footer/Footer';

const headerprops = {
	icon: 'search',
	title: 'Consulta',
	subtitle: 'Consulta de usuarios'
};

export default class Consulta extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-2">
					<Logo />
					<Nav />
				</div>
				<div className="col-10">
					<Main {...headerprops}>
						<table className="table mt-8">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nome</th>
									<th>Telefone</th>
									<th>Endereço</th>
									<th>Data de Adesão</th>
									<th>Próxima Coleta</th>
									<th>Próximo Pagamento</th>
									<th>Ações</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Bruno Silva Daniel</td>
									<td>998482837</td>
									<td>88805-200</td>
									<td>20/01/2020</td>
									<td>23/01/2020</td>
									<td>22/01/2020</td>
									<td>
										<button className="btn btn-warning">
											<i className="fa fa-pencil" />
										</button>
										<button className="btn btn-danger ">
											<i className="fa fa-trash" />
										</button>
									</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Gustavo Delucca</td>
									<td>995796232</td>
									<td>88605-300</td>
									<td>20/01/2020</td>
									<td>30/01/2020</td>
									<td>30/01/2020</td>
									<td>
										<div>
											<button className="btn btn-warning">
												<i className="fa fa-pencil" />
											</button>
											<button className="btn btn-danger">
												<i className="fa fa-trash" />
											</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</Main>
					<div className="fixed-bottom">
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}
