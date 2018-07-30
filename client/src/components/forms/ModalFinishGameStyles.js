import { StyleSheet } from 'aphrodite/no-important';

import { COLORS } from '../_constants/colors';

export const styles = StyleSheet.create({
  gridMaster: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    height: '90vh',
    gridRowGap: '1rem'
  },
  layer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.5,
    zIndex: 3
  },
  card: {
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    borderRadius: '3px',
    position: 'relative',
    display: 'inline-block',
    margin: '0 2.5px'
  },
  image: {
    maxHeight: '50px',
    maxWidth: '50px'
  },
  line: {
    height: '50px',
    margin: '5px 0'
  },
  finalInfos: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: '1rem'
  },
  table: {
    borderSpacing: '.5rem',
    borderCollapse: 'separate'
  },
  rightInfos: {
    display: 'grid',
    gridTemplateRows: '1fr auto'
  },
  title: {
		textAlign: 'center',
		fontSize: '36px',
		color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  gridMoves: {
    display: 'grid',
    overflow: 'hidden',
    gridTemplateRows: 'auto 1fr',
    ':nth-child(1n) > :last-child': {
      overflowY: 'auto'
		}
  },
  gridMove: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridColumnGap: '1rem'
  },
  gridMoveLeft: {
    display: 'grid',
    gridTemplateRows: '1fr auto'
  },
  white: {
    backgroundColor: COLORS.white
  },
  dark2: {
    backgroundColor: COLORS.dark2
  },
});
export const stylesPlayer = (props) => StyleSheet.create({
  player: {
    [props.style]: COLORS[`player${props.index+1}`],
  },
});