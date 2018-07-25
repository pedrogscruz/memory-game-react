import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../../_constants/colors';

export const styles = StyleSheet.create({
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr auto 1fr',
		gridColumnGap: '1rem',
	},
	squares: {
		height: '100vh',
		overflowY: 'auto',
		backgroundImage: `linear-gradient(${COLORS.dark2} 10px, transparent 0%), linear-gradient(to left, ${COLORS.dark1} 85px, ${COLORS.dark2} 10px)`,
		backgroundSize: '95px 95px',
		display: 'table',
    width: '100vw',
    padding: '1rem'
  },
  card: {
    padding: '.25rem'
  },
  image: {
    maxHeight: "100px",
    maxWidth: "100px"
	},
	playerGrid: {
		display: 'grid',
		gridTemplateColumns: 'auto auto',
		gridColumnGap: '1rem',
		border: `1px solid ${COLORS.white} !important`,
    backgroundColor: COLORS.black,
    color: '#fff',
    fontWeight: 'bold',
    padding: '0.25rem .5rem',
    borderRadius: '4px !important',
		height: '34px',
		width: 'fit-content'
	},
	timePerMove: {
		position: 'absolute',
		left: 10,
		bottom: 10,
		zIndex: 10,
	}
});