import React from 'react';
import { isAuthenticated } from './auth';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../components/Login/Login';
// import Consulta from '../components/Consulta/Consulta';
import Home from '../components/Home/Home';
import Rotas from '../components/Rotas/Rotas';
import Clientes from '../components/User/Cadastro';
import ColetaPeso from '../components/User/ColetaPeso';
import Financeiro from '../components/User/Financeiro';
import Logout from '../components/Logout/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/', state: { from: props.location } }} />
			)}
	/>
);

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/Login" component={Login} />
			<PrivateRoute path="/Home" component={Home} />
			<PrivateRoute path="/Rotas" component={Rotas} />
			<PrivateRoute path="/Clientes" component={Clientes} />
			<PrivateRoute path="/ColetaPeso" component={ColetaPeso} />
			<PrivateRoute path="/Financeiro" component={Financeiro} />
			<Route path="/Logout" component={Logout} />
			<Redirect from="*" to="/Login" />
		</Switch>
	</BrowserRouter>
);

export default Routes;
