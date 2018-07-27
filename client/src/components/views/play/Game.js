import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './GameStyles';

// import { savePausedGame, saveFinishedGame } from '../../../actions/player'
import { fetchTheme } from '../../../actions/theme'

import { AwesomeButton } from 'react-awesome-button';
import PropTypes from 'prop-types';

// import Timer from '../../common/Timer';

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
  cardsQty:56,
    players: [
      {id: "1", createdAt: "2018-07-25T03:50:34.125Z", nickname: "pedro", password: "nois", exists: true},
      {id: "2", createdAt: "2018-07-25T05:55:03.731Z", nickname: "emerson", password: "1234", exists: true},
      {id: "6", createdAt: "2018-07-25T16:37:39.513Z", nickname: "asdjskjx", password: "abc", exists: true}
    ],
    playersNumber:3,
    timePerMove:5
  }
}

// const defaultProps = {
//   gameConfig: {
//     playersNumber: 2,
//     players: [
//       {
//         "id": "1",
//         "createdAt": "2018-07-25T03:50:34.125Z",
//         "nickname": "pedro",
//         "password": "nois"
//       },
//       {
//         "id": "2",
//         "createdAt": "2018-07-25T05:55:03.731Z",
//         "nickname": "emerson",
//         "password": "1234"
//       }
//     ],
//     timePerMove: 10,
//     cardsQty: 16
//   }
// };

class Game extends React.Component {
  constructor (props) {
    super(props);
    const matrixExample = [
      {cardsQty: 16, x: 4, y: 4},
      {cardsQty: 24, x: 4, y: 6},
      {cardsQty: 36, x: 6, y: 6},
      {cardsQty: 56, x: 8, y: 7},
    ];
    this.state = {
      end: '',
      turn: 0,
      moves: [],
      details: [],
      interval: false,
      modalSave: false,
      firstMove: false,
      start: new Date(),
      modalResult: false,
      removeEvents: false,
      time: props.gameConfig.timePerMove,
      players: props.gameConfig.players.map(item => { return {...item, points: 0} }),
      matrix: matrixExample.find((item) => item.cardsQty === props.gameConfig.cardsQty)
    }
  }
  componentDidMount() {
    if (!this.state.interval)
      this.resetInterval();
    setInterval(() => {
      var now = parseInt(new Date().getTime() / 1000) - parseInt(this.state.start.getTime() / 1000),
      hours = parseInt(now/3600);
      now -= 3600 * hours;
      var min = parseInt(now/60);
      now -= 60 * min;
      this.refs.matchTime.innerHTML = `${hours>9?hours:('00'+hours).slice(-2)}:${('00'+min).slice(-2)}:${('00'+now).slice(-2)}`;
    }, 450);
    const { fetchTheme } = this.props;
    fetchTheme((theme) => {
      var cards = [], position = [], details = [];
      for (var i=0; i<this.props.gameConfig.cardsQty; i++)
        details.push({status: 'closed'});
      while(cards.length < parseInt(this.props.gameConfig.cardsQty/2)) {
        var randomCard = Math.floor(Math.random()*theme.length);
        if(!cards.includes(randomCard)) {
          cards.push(randomCard);
          var k=0;
          while (k<2) {
            var randomPosition = Math.floor(Math.random()*this.props.gameConfig.cardsQty);
            if(!position.includes(randomPosition)) {
              position.push(randomPosition);
              details[randomPosition].src = theme[randomCard];
              k++;
            }
          }
        }
      }
      this.setState({details});
    });
  }
  resetInterval() {
    this.state.end = new Date();
    this.state.end.setSeconds(this.state.end.getSeconds() + this.props.gameConfig.timePerMove);
    this.state.interval = setInterval(() => {
      var seconds = (Math.round((this.state.end - new Date()) / 100) / 10).toFixed(1);
      if (seconds <= 0) {
        var message = 'Lose a turn';
        this.refs.time.innerHTML = '0.0';
        this.state.end = new Date();
        this.state.end.setSeconds(this.state.end.getSeconds() + this.props.gameConfig.timePerMove);
        this.refs.message.innerHTML = message;
        const {id, nickname} = this.state.players[this.state.turn];
        this.state.moves.push({
          player: {id, nickname},
          firstMove: this.state.firstMove.index,
          message
        });
        this.setState({firstMove: false, removeEvents: true}, () => {
          clearInterval(this.state.interval);
          setTimeout(() => {
            this.refs.message.innerHTML = '';
            this.setState((prevState) => {
              return {
                removeEvents: false,
                turn: (prevState.turn+1)%this.props.gameConfig.playersNumber,
                details: prevState.details.map((dtl) => {
                  if (dtl.status === 'open')
                    dtl.status = 'closed';
                  return dtl;
                })
              }
            }, () => this.resetInterval());
          }, 1750);
        });
      }
      else if (this.refs.time)
        this.refs.time.innerHTML = seconds;
    }, 50);
  }
  verifyHit (index) {
    if (this.state.firstMove) {
      var after = () => {}, firstIndex = -1;
      if (this.state.firstMove.src === this.state.details[index].src) {
        var message = 'Hit!';
        this.state.details[index].status = 'hit';
        this.state.details[this.state.firstMove.index].status = 'hit';
        this.state.players[this.state.turn].points++;
        this.state.details[this.state.firstMove.index].hitter = {...this.state.players[this.state.turn]};
        this.refs.message.innerHTML = message;
        const {id, nickname} = this.state.players[this.state.turn];
        this.state.moves.push({
          player: {id, nickname},
          firstMove: this.state.firstMove.index,
          secondMove: index,
          message
        });
        this.setState({firstMove: false, removeEvents: true}, () => {
          var points = 0, best = [{points: 0, player: {}}];
          this.state.players.map((plyr) => {
            points += plyr.points;
            // if (plyr.points > 0)
          });
          if (points == this.props.gameConfig.cardsQty/2)
            this.refs.message.innerHTML = 'Winner';
          else {
            clearInterval(this.state.interval);
            setTimeout(() => {
              this.refs.message.innerHTML = '';
              this.setState({removeEvents: false}, () => this.resetInterval())
            }, 1750);
          }
        });
      }
      else {
        var message = 'Missed';
        this.state.details[index].status = 'open';
        firstIndex = this.state.firstMove.index;
        this.refs.message.innerHTML = message;
        const {id, nickname} = this.state.players[this.state.turn];
        this.state.moves.push({
          player: {id, nickname},
          firstMove: this.state.firstMove.index,
          secondMove: index,
          message
        });
        this.setState({firstMove: false, removeEvents: true}, () => {
          clearInterval(this.state.interval);
          setTimeout(() => {
            this.refs.message.innerHTML = '';
            this.state.details[index].status = 'closed';
            this.state.details[firstIndex].status = 'closed'
            this.setState((prevState) => {
              return {
                removeEvents: false,
                turn: (prevState.turn+1)%this.props.gameConfig.playersNumber
              }
            }, () => this.resetInterval());
          }, 1750);
        });
      }
    }
    else {
      this.state.details[index].status = 'open';
      this.setState({firstMove: {...this.state.details[index], index}});
    }
  }
  renderCards() {
    var matrix = [];
    for (var i=0; i<this.state.matrix.y; i++) {
      var line = [];
      for (var k=0; k<this.state.matrix.x; k++) {
        const index = (this.state.matrix.x*i)+k;
        const show = ['hit', 'open'].includes(this.state.details[index].status)
        line.push(
          <span className={css(styles.card)} key={`card_${(this.state.matrix.x*i)+k}`}>
            {/* {(this.state.matrix.x*i)+k+1} */}
            <AwesomeButton
              action={() => {
                if (this.state.details && this.state.details[index].status === 'closed')
                  this.verifyHit(index)
              }}
            >
              { show &&
                <img className={css(styles.image)} src={`/api/card/${this.state.details[(this.state.matrix.x*i)+k].src}`} />
              }
            </AwesomeButton>
          </span>
        );
      }
      matrix.push(<div className={css(styles.card)}>{line}</div>);
    }
    return matrix;
  }
  renderPlayer (plyr, principal) {
    return (
      <span className={css(styles.playerGrid, principal && styles.principal)}>
        <span>{plyr.nickname}</span>
        <span>{plyr.points}</span>
      </span>
    )
  }
  render() {
    return (
      <div className={css(styles.squares, this.state.removeEvents ? styles.removeEvents : null)}>
        <div className={css(styles.timePerMove)}>
          {/* <Timer second={10} finished={() => this.setState((prevState) => {
            return {
              turn: (prevState.turn+1)%this.props.gameConfig.playersNumber
            }
          })} /> */}
          <div ref={'time'}></div>
        </div>
        <div className={css(styles.matchTime)}>
          <div ref={'matchTime'}></div>
        </div>
        <div className={css(styles.gridTop)}>
          <AwesomeButton
            type="secondary"
            action={() => this.setState({modalSave: true})}
          >
            Menu
          </AwesomeButton>
          <center>
            <span ref='message'></span>
          </center>
          <AwesomeButton
            type="secondary"
            action={() => {}}
          >
            Save
          </AwesomeButton>
        </div>
        <div>
          {this.props.gameConfig.playersNumber === 2 ?
            <div>
              <center>{this.renderPlayer(this.state.players[(this.state.turn+1)%2])}</center>
              <center>
                <div>
                  {this.state.details.length === this.props.gameConfig.cardsQty && this.renderCards()}
                </div>
              </center>
              <center>{this.renderPlayer(this.state.players[this.state.turn], true)}</center>
            </div>
          :
          this.props.gameConfig.playersNumber === 3 ?
            <div>
              <div className={css(styles.grid)}>
                <div>
                  {this.renderPlayer(this.state.players[(this.state.turn+1)%3])}
                </div>
                <div>{this.state.details.length === this.props.gameConfig.cardsQty && this.renderCards()}</div>
                <div>{this.renderPlayer(this.state.players[(this.state.turn+2)%3])}</div>
              </div>
              <center>{this.renderPlayer(this.state.players[this.state.turn], true)}</center>
            </div>
          :
          this.props.gameConfig.playersNumber === 4 ?
            <div>
              <center>{this.renderPlayer(this.state.players[(this.state.turn+2)%4])}</center>
              <div className={css(styles.grid)}>
                <div>
                  <div className={css(styles.middleAlign)}>
                    {this.renderPlayer(this.state.players[(this.state.turn+1)%4])}
                  </div>
                </div>
                <div>{this.state.details.length === this.props.gameConfig.cardsQty && this.renderCards()}</div>
                <div>
                  <div className={css(styles.middleAlign)}>
                    {this.renderPlayer(this.state.players[(this.state.turn+3)%4])}
                  </div>
                </div>
              </div>
              <center>{this.renderPlayer(this.state.players[this.state.turn], true)}</center>
            </div>
          :null}
        </div>
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

export default connect(mapStateToProps, {fetchTheme})(Game);