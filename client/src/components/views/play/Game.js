import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './GameStyles';
import 'react-awesome-button/dist/themes/theme-eric.css';

// import { savePausedGame, saveFinishedGame } from '../../../actions/player'

import { AwesomeButton } from 'react-awesome-button';
import PropTypes from 'prop-types';

import Timer from '../../common/Timer';

const propTypes = {
	gameConfig: PropTypes.object,
}

// const defaultProps = {
//   gameConfig: {
//     playersNumber: 0,
//     players: [],
//     timePerMove: 0,
//     cardsQty: 0
//   }
// };

const defaultProps = {
  gameConfig: {
    playersNumber: 2,
    players: [
      {
        "id": "1",
        "createdAt": "2018-07-25T03:50:34.125Z",
        "nickname": "pedro",
        "password": "nois"
      },
      {
        "id": "2",
        "createdAt": "2018-07-25T05:55:03.731Z",
        "nickname": "emerson",
        "password": "1234"
      }
    ],
    timePerMove: 10,
    cardsQty: 16
  }
};

class Game extends React.Component {
  constructor (props) {
    super(props);
    const matrixExample = [
      {cardsQty: 16, x: 4, y: 4},
      {cardsQty: 24, x: 4, y: 6},
      {cardsQty: 36, x: 6, y: 6},
      {cardsQty: 56, x: 6, y: 7},
    ];
    this.state = {
      end: '',
      turn: 0,
      time: props.gameConfig.timePerMove,
      details: [],
      matrix: matrixExample.find((item) => item.cardsQty === props.gameConfig.cardsQty),
      interval: false
    }
  }
  componentDidMount() {
    if (!this.state.interval) {
      this.state.end = new Date();
      this.state.end.setSeconds(this.state.end.getSeconds() + 10);
      this.state.interval = setInterval(() => {
        var seconds = (Math.round((this.state.end - new Date()) / 100) / 10).toFixed(1);
        if (seconds <= 0) {
          this.state.end = new Date();
          this.state.end.setSeconds(this.state.end.getSeconds() + 10);
          this.setState((prevState) => {
            return {
              turn: (prevState.turn+1)%this.props.gameConfig.playersNumber
            }
          });
        }
        else
          this.refs.time.innerHTML = seconds;
      }, 50);
    }
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
  renderPlayer (plyr) {
    return (
      <div className={css(styles.playerGrid)}>
        <div>{plyr.points?plyr.points:0}</div>
        <div>{plyr.nickname}</div>
      </div>
    )
  }
  render() {
    return (
      <div className={css(styles.squares)}>
        <div className={css(styles.timePerMove)}>
          {/* <Timer second={10} finished={() => this.setState((prevState) => {
            return {
              turn: (prevState.turn+1)%this.props.gameConfig.playersNumber
            }
          })} /> */}
          <div ref={'time'}></div>
        </div>
        {this.props.gameConfig.playersNumber === 2 ?
          <div>
            <center>{this.renderPlayer(this.props.gameConfig.players[(this.state.turn+1)%2])}</center>
            <center>
              <div>
                {this.renderCards()}
              </div>
            </center>
            <center>{this.renderPlayer(this.props.gameConfig.players[this.state.turn])}</center>
          </div>
        :
        this.props.gameConfig.playersNumber === 3 ?
          <div>
            <div className={css(styles.grid)}>
              <div>{this.renderPlayer(this.props.gameConfig.players[(this.state.turn+1)%3])}</div>
              <div>{this.renderCards()}</div>
              <div>{this.renderPlayer(this.props.gameConfig.players[(this.state.turn+2)%3])}</div>
            </div>
            <center>{this.renderPlayer(this.props.gameConfig.players[this.state.turn])}</center>
          </div>
        :
        this.props.gameConfig.playersNumber === 4 ?
          <div>
            <center>{this.renderPlayer(this.props.gameConfig.players[(this.state.turn+2)%4])}</center>
            <div className={css(styles.grid)}>
              <div>{this.renderPlayer(this.props.gameConfig.players[(this.state.turn+1)%4])}</div>
              <div>{this.renderCards()}</div>
              <div>{this.renderPlayer(this.props.gameConfig.players[(this.state.turn+3)%4])}</div>
            </div>
            <center>{this.renderPlayer(this.props.gameConfig.players[this.state.turn])}</center>
          </div>
        :null}
      </div>
    );
  }
}

Game.propTypes = propTypes;
Game.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    gameConfig: state.config.game
  }
}

export default connect(mapStateToProps)(Game);