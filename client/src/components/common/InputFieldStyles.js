import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  input: {
    border: `1px solid ${COLORS.white} !important`,
    backgroundColor: COLORS.black,
    color: '#fff',
    fontWeight: 'bold',
    padding: '0.25rem .5rem',
    borderRadius: '4px !important',
    height: '34px',
    width: '100%'
  }
});