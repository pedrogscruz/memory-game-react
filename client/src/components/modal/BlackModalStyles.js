import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  behind: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    positon: 'fixed',
    overflowY: 'auto',
    backgroundColor: 'rgb(0, 0, 0, 0.4)'
  },
  container: {
    display: 'table',
    width: '100%',
    height: '100%'
  },
  cell: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  inside: {
    margin: '0 auto'
  }
});