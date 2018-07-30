import { StyleSheet } from 'aphrodite/no-important';

export const styles = StyleSheet.create({
  behind: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    overflowY: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 4,
    transition: 'opacity 10s ease-in-out'
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
// export const stylesPlayer = (props) => StyleSheet.create({
//   player: {
//     [props.style]: COLORS[`player${props.index+1}`],
//   },
// });