import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  dashed: {
    border: `2px dashed ${COLORS.white}`,
    borderRadius: '7px',
    ':nth-child(1n) > :first-child': {
      paddingTop: '1rem',
    },
    ':nth-child(1n) > :last-child': {
      paddingBottom: '1rem',
			borderBottom: 'none'
		}
  },
  table: {
    borderSpacing: '.5rem',
    borderCollapse: 'separate',
    textAlign: 'left',
    width: '100%'
  },
  container: {
    padding: '.5rem',
    borderBottom: '2px dashed #fff'
  },
  line3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '100%',
    textAlign: 'center',
    ':nth-child(1n) > :first-child': {
      textAlign: 'left'
    },
    ':nth-child(1n) > :last-child': {
      textAlign: 'right'
    }
  },
  dark1: {
    backgroundColor: COLORS.dark1
  },
  dark2: {
    backgroundColor: COLORS.dark2
  },
  error: {
    marginTop: '.5rem',
    fontSize: '10px',
    color: COLORS.red
  }
});