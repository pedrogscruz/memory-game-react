import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	grid: {
		width: '405px',
		textAlign: 'center',
		display: 'table-cell',
		verticalAlign: 'middle',
		padding: '1rem'
	},
	title: {
		textAlign: 'center',
		fontSize: '44px',
		color: COLORS.white,
		fontWeight: 'bold'
	},
	squares: {
		height: '100vh',
		overflowY: 'auto',
		backgroundImage: `linear-gradient(${COLORS.dark2} 10px, transparent 0%), linear-gradient(to left, ${COLORS.dark1} 85px, ${COLORS.dark2} 10px)`,
		backgroundSize: '95px 95px',
		display: 'table',
    width: '100vw'
	},
	awesomeButton: {
		width: '100%'
	},
	options: {
		marginTop: '1rem',
    display: 'grid',
    gridRowGap: '.5rem',
    width: 'fit-content',
    margin: 'auto',
    border: `1px solid ${COLORS.white}`,
		padding: '1rem',
		borderRadius: '5px'
	}
});