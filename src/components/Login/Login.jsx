import React, { Component } from 'react';
import { Button, FormGroup, Label, Form, Input } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import './Login.css';
import logo from '../../assets/imgs/adb1.jfif';

export default class Login extends Component {
	signIn = () => {
		const data = { email: this.email, password: this.password };

		console.log(data);

		const method = 'post';
		const url = 'https://app-adubooo-backend.herokuapp.com/signin';
		axios
			[method](url, data)
			.then((resp) => {
				localStorage.setItem('token', resp.data.token);
				this.props.history.push('/Home');
			})
			.catch((err) => toast.error('E-mail/Senhas invalidos!'));
		this.props.history.push('/Home');
	};
	render() {
		return (
			<div className="Login verde">
				<ToastContainer />
				<Form className="branco">
					<img id="img-logo" src={logo} alt="logo" />
					<FormGroup bsSize="large">
						<Label for="email">Email</Label>
						<Input
							autoFocus
							type="text"
							id="email"
							onChange={(e) => (this.email = e.target.value)}
							placeholder="Informe seu e-mail"
						/>
					</FormGroup>
					<FormGroup bsSize="large">
						<Label for="password">Senha</Label>
						<Input
							type="password"
							id="password"
							onChange={(e) => (this.password = e.target.value)}
							placeholder="Informe sua senha"
						/>
					</FormGroup>
					<Button className="botao" block bsSize="large" onClick={this.signIn}>
						Login
					</Button>
				</Form>
			</div>
		);
	}
}
