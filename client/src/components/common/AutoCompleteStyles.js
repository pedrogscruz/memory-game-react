import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
	suggestionsContainer: {
    border: `1px solid ${COLORS.white}`,
    position: 'absolute',
		width: '100%',
		maxHeight: '220px',
		overflowX: 'hidden',
		overflowY: 'auto',
    backgroundColor: COLORS.dark1,
    color: '#fff',
		borderRadius: 0,
		zIndex: 4
	},
	suggestionsList: {
		margin: 0,
    listStyle: 'none',
    padding: '0px',
    textAlign: 'left',
		fontWeight: 200
	},
	suggestion: {
		padding: '.25rem .5rem',
		// lineHeight: '1.5rem',
		cursor: 'pointer',
		':hover': {
			backgroundColor: COLORS.dark2
		}
	},
	suggestionSelected: {
    backgroundColor: COLORS.dark2
	},
	fieldset: {
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	input: {
		width: '100%',
		border: `1px solid ${COLORS.white} !important`,
    backgroundColor: COLORS.black,
    color: '#fff',
    fontWeight: 'bold',
    padding: '0.25rem .5rem',
    borderRadius: '4px !important',
    height: '34px'
	}
});