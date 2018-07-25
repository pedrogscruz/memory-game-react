import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { css } from 'aphrodite/no-important';
import { styles } from './MenuStyles';

import { AwesomeButton } from 'react-awesome-button';

class Menu extends React.Component {
	constructor (props) {
		super(props);
		const { match } = props;
		this.state = {
			options: [
				{
					text: 'Play',
					path: `${match.url}config`
				},
				{
					text: 'Saved Games',
					path: `${match.url}saved`
				},
				{
					text: 'Create Theme',
					path: `${match.url}theme`
				},
				{
					text: 'Ranking',
					path: `${match.url}ranking`
				}
			]
		}
	}
	// render the options of the menu
	renderMenuOption (option) {
		return (
			<NavLink
				key={option.path}
				to={option.path}
			>
				<AwesomeButton type="primary" size="large">{option.text}</AwesomeButton>
			</NavLink>
		);
	}
	render () {
		return (
			<div className={css(styles.squares)}>
				<div className={css(styles.grid)}>
					<div className={css(styles.title)}>MEMORY<br/>GAME</div>
					<div className={css(styles.options)}>
						{this.state.options.map((opt) => this.renderMenuOption(opt))}
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;