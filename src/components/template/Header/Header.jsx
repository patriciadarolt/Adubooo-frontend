import './Header.css';
import React from 'react';

export default (props) => (
	<header className="header d-none d-sm-flex flex-column corverd">
		<h1>
			<i className={`fa fa-${props.icon}`} /> {props.title}
		</h1>
		<p className="lead text-muted pad">{props.subtitle}</p>
	</header>
);
