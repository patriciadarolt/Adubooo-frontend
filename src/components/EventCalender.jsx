import React, { Component } from 'react';
import axios from 'axios';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const baseUrl = 'https://app-adubooo-backend.herokuapp.com/clientes';

class App extends Component {
	state = {
		list: [],
		events: []
	};

	testMap() {
		const testMapp = this.state.list.map((user) => {
			console.log(user.proxColeta);
			return {
				start: new Date(user.proxColeta),
				end: new Date(user.proxColeta),
				title: user.nome
			};
		});
		console.log(testMapp);
		this.setState({ events: testMapp });
		console.log(this.state.events);
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
			this.testMap();
		});
	}

	render() {
		console.log(this.state.list);

		return (
			<div className="App">
				<Calendar
					localizer={localizer}
					defaultDate={new Date()}
					defaultView="month"
					events={this.state.events}
					style={{ height: '100vh' }}
				/>
			</div>
		);
	}
}

export default App;
