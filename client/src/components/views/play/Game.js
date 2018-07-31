import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './GameStyles';

import { finishedMatch } from '../../../actions/match'
import { fetchTheme } from '../../../actions/theme'

import { AwesomeButton } from 'react-awesome-button';
import PropTypes from 'prop-types';
import { matrixExample } from '../../_constants/matrix';

import BlackModal from '../../modal/BlackModal';
import ModalFinishGame from '../../forms/ModalFinishGame';

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
    cardsQty: 16,
    players: [
      {id: "1", createdAt: "2018-07-25T03:50:34.125Z", nickname: "pedro", password: "nois", exists: true},
      {id: "2", createdAt: "2018-07-25T05:55:03.731Z", nickname: "emerson", password: "1234", exists: true},
      {id: "6", createdAt: "2018-07-25T16:37:39.513Z", nickname: "asdjskjx", password: "abc", exists: true}
    ],
    playersNumber:3,
    timePerMove:10
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

class Game extends Component {
  constructor (props) {
    super(props);
    this.state = {
      end: '',
      turn: 0,
      moves: [],
      details: [],
      gameTime: false,
      interval: false,
      modalSave: false,
      firstMove: false,
      start: new Date(),
      modalResult: false,
      removeEvents: false,
      showFinalModal: false,
      time: props.gameConfig.timePerMove,
      players: props.gameConfig.players.map(item => { return {...item, points: 0} }),
      matrix: matrixExample.find((item) => item.cardsQty === props.gameConfig.cardsQty)
    }
  }
  componentDidMount() {
    if (!this.state.interval)
      this.resetInterval();
    this.state.gameTime = setInterval(() => {
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
        const {id, nickname} = this.state.players[this.state.turn];
        this.state.moves.push({
          player: {id, nickname},
          firstMove: this.state.firstMove.index,
          time: 10.0,
          message
        });
        this.refs.time.innerHTML = '0.0';
        this.state.end = new Date();
        this.state.end.setSeconds(this.state.end.getSeconds() + this.props.gameConfig.timePerMove);
        this.refs.message.innerHTML = message;
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
      var firstIndex = -1, message;
      if (this.state.firstMove.src === this.state.details[index].src) {
        message = 'Hit!';
        this.state.details[index].status = 'hit';
        this.state.details[this.state.firstMove.index].status = 'hit';
        this.state.players[this.state.turn].points++;
        this.state.details[index].hitter = this.state.players[this.state.turn].id;
        this.state.details[this.state.firstMove.index].hitter = this.state.players[this.state.turn].id;
        this.refs.message.innerHTML = message;
        const {id, nickname} = this.state.players[this.state.turn];
        this.state.moves.push({
          player: {id, nickname},
          firstMove: this.state.firstMove.index,
          secondMove: index,
          time: parseFloat((10 - parseFloat(this.refs.time.innerHTML)).toFixed(1)),
          message
        });
        this.setState({firstMove: false, removeEvents: true}, () => {
          var points = 0, best = [{points: 0, player: {}}];
          this.state.players.map((plyr) => {
            points += plyr.points;
            // if (plyr.points > 0)
          });
          if (points == this.props.gameConfig.cardsQty/2) {
            this.refs.message.innerHTML = 'End';
            clearInterval(this.state.interval);
            clearInterval(this.state.gameTime);
            const { finishedMatch, gameConfig: {timePerMove, cardsQty, players} } = this.props;
            const { details, moves } = this.state;
            var time = this.refs.matchTime.innerHTML.split(':');
            time = parseInt(time[0])*3600 + parseInt(time[1])*60 + parseInt(time[2]);
            this.setState({removeEvents: false, showFinalModal: true});
            finishedMatch({
              timePerMove,
              cardsQty,
              time,
              details: details.map((dtls) => {
                const {src, hitter} = dtls;
                return {src, hitter}
              }),
              moves: moves.map((mv) => {
                return {...mv, player: mv.player.id}
              }),
              players: players.map((item) => item.id)
            })
          }
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
        message = 'Missed';
        this.state.details[index].status = 'open';
        firstIndex = this.state.firstMove.index;
        this.refs.message.innerHTML = message;
        const {id, nickname} = this.state.players[this.state.turn];
        this.state.moves.push({
          player: {id, nickname},
          firstMove: this.state.firstMove.index,
          secondMove: index,
          time: parseFloat((10 - parseFloat(this.refs.time.innerHTML)).toFixed(1)),
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
      matrix.push(<div key={`line_${matrix.length}`} className={css(styles.line)}>{line}</div>);
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
        <BlackModal
          show={this.state.showFinalModal}
          inside={
            <ModalFinishGame
              matchTime={this.refs.matchTime?this.refs.matchTime.innerHTML:'00:00:00'}
              players={this.state.players}
              details={this.state.details}
              moves={this.state.moves}
            />
          }
        />
        <div ref={'time'} className={css(styles.timePerMove)}></div>
        <div ref={'matchTime'} className={css(styles.matchTime)}></div>
        <div className={css(styles.gridTop)}>
          <div style={{zIndex: 4}}>
            <AwesomeButton
              type="secondary"
              action={() => this.setState({modalSave: true})}
            >
              Menu
            </AwesomeButton>
          </div>
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

export default connect(mapStateToProps, { finishedMatch, fetchTheme })(Game);