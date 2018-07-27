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
  container: {
    padding: '.5rem',
    borderBottom: '2px dashed #fff'
  }
});