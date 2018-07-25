import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './MenuStyles';

import { AwesomeButton } from 'react-awesome-button';

class Menu extends React.Component {
	constructor (props) {
		super(props);
	}
	// render the options of the menu
	renderMenuOption (option) {
		const { match } = this.props;
		return (
			<table className={css(styles.table)}>
				<tr>
					<td>
						<NavLink
							key={`${match.url}config`}
							to={`${match.url}config`}
						>
							<AwesomeButton type="primary" size="large">Play</AwesomeButton>
						</NavLink>
					</td>
					<td>
						<NavLink
							key={`${match.url}saved`}
							to={`${match.url}saved`}
						>
							<AwesomeButton disabled={true} type="primary" size="large">Saved<br/>Games</AwesomeButton>
						</NavLink>
					</td>
				</tr>
				<tr>
					<td>
						<NavLink
							key={`${match.url}theme`}
							to={`${match.url}theme`}
						>
							<AwesomeButton disabled={true} type="primary" size="large">Create<br/>Theme</AwesomeButton>
						</NavLink>
					</td>
					<td>
						<NavLink
							key={`${match.url}ranking`}
							to={`${match.url}ranking`}
						>
							<AwesomeButton disabled={true} type="primary" size="large">Ranking</AwesomeButton>
						</NavLink>
					</td>
				</tr>
			</table>
		);
	}
	render () {
		return (
			<div className={css(styles.squares)}>
				<div className={css(styles.grid)}>
					<div className={css(styles.title)}>MEMORY<br/>GAME</div>
					<div className={css(styles.options)}>
						{this.renderMenuOption()}
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;