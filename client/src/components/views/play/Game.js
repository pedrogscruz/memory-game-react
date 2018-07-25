import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './GameStyles';
import 'react-awesome-button/dist/themes/theme-eric.css';

// import { savePausedGame, saveFinishedGame } from '../../../actions/player'

import { AwesomeButton } from 'react-awesome-button';

import SelectBox from '../../common/SelectBox';
import PlayerContainer from '../../forms/PlayerContainer';

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      turn: 1,
      time: 0,
      details: [],
      matrixExample: [
        {cardsQty: 16, x: 4, y: 4},
        {cardsQty: 24, x: 4, y: 6},
        {cardsQty: 36, x: 6, y: 6},
        {cardsQty: 56, x: 6, y: 7},
      ],
      matrix: {x: 4, y: 6}
    }
  }
  componentDidMount() {
    const { history } = this.props;
    console.log(history);
    // if (!this.props.gameConfig) {
    //   history.push('/config');
    //   return;
    // }
    // const {playersNumber, players, timePerMove, cardsQty} = this.props.gameConfig;
    // if (
    //   !playersNumber ||
    //   !players ||
    //   !timePerMove ||
    //   !cardsQty
    // )
    //   history.push('/config');
  }
  renderCards() {
    var matrix = [];
    for (var i=0; i<this.state.matrix.y; i++) {
      var line = [];
      for (var k=0; k<this.state.matrix.x; k++)
        line.push(
          <span className={css(styles.card)}>
            {/* {(this.state.matrix.x*i)+k+1} */}
            <AwesomeButton><img className={css(styles.image)} src={"https://i.kinja-img.com/gawker-media/image/upload/s--XpVzvGRN--/c_scale,f_auto,fl_progressive,q_80,w_800/mauhos11g8os6j8cnptj.jpg"} /></AwesomeButton>
          </span>
        );
      matrix.push(<div className={css(styles.card)}>{line}</div>);
    }
    return matrix;
  }
  render() {
    return (
      <div className={css(styles.squares)}>
        <center></center>
        <div className={css(styles.grid)}>
          <div></div>
          <div>{this.renderCards()}</div>
          <div></div>
        </div>
        <center></center>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameConfig: state.config.game
  }
}

export default connect(mapStateToProps)(Game);