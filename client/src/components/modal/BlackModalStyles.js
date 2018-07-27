import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  behind: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    overflowY: 'auto',
    backgroundColor: 'rgb(0, 0, 0, 0.9)',
    zIndex: 4,
    transition: 'opacity 1s ease-in-out'
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
    margin: '0 auto',
    width: 'fit-content',
    backgroundColor: '#000',
    borderRadius: '5px',
    border: '1px solid #fff',
    padding: '1rem'
  }
});