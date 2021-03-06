import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles, stylesPlayer } from './ModalFinishGameStyles';

import PropTypes from 'prop-types';

import DashedList from '../lists/DashedList';
import { matrixExample } from '../_constants/matrix';

const propTypes = {
	players: PropTypes.array,
	details: PropTypes.array,
	moves: PropTypes.array
}

const defaultProps = {
  players: [],
  details: [],
  moves: []
};

class ModalFinishGame extends Component {
  constructor (props) {
    super(props);
    this.state = {
      matrix: {cardsQty: 0, x: 0, y: 0},
      ranking: []
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    const { props } = this;
    console.log(props);
    var ranking = props.players.map((plyr, index) => {
      return {...plyr, index}
    }).sort((a, b) => 
      (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : 0
    ).map((plyr, index) => {
      return {pos: index+1, nickname: plyr.nickname, points: plyr.points, index: plyr.index}
    });
    console.log(ranking);
    console.log(ranking.map((plyr, index) => {
      if (index > 0 && plyr.points === ranking[index-1].points)
        plyr.pos = ranking[index-1].pos;
      return plyr;
    }));
    this.setState({
      matrix: matrixExample.find((item) => item.cardsQty === props.details.length),
      ranking: ranking.map((plyr, index) => {
        if (index > 0 && plyr.points === ranking[index-1].points)
          plyr.pos = ranking[index-1].pos;
        return plyr;
      })
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    var ranking = nextProps.players.map((plyr, index) => {
      return {...plyr, index}
    }).sort((a, b) => 
      (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : 0
    ).map((plyr, index) => {
      return {pos: index+1, nickname: plyr.nickname, points: plyr.points, index: plyr.index}
    });
    this.setState({
      matrix: matrixExample.find((item) => item.cardsQty === nextProps.details.length),
      ranking: ranking.map((plyr, index) => {
        if (index > 0 && plyr.points === ranking[index-1].points)
          plyr.pos = ranking[index-1].pos;
        return plyr;
      })
    });
  }
  renderRanking(plyr, index) {
    return(
      <tr className={css(stylesPlayer({index: plyr.index, style: 'color'}).player)} key={`renderRanking_${index}`}>
        <td>{plyr.pos}.</td>
        <td>{plyr.nickname}</td>
        <td>{plyr.points}</td>
      </tr>
    );
  }
  renderFinalResult() {
    var matrix = [];
    for (var i=0; i<this.state.matrix.y; i++) {
      var line = [];
      for (var k=0; k<this.state.matrix.x; k++) {
        const index = (this.state.matrix.x*i)+k,
        plyrIndex = this.props.players.findIndex((plyr) => plyr.id === this.props.details[index].hitter);
        line.push(
          <span className={css(styles.card)} key={`card_${index}`}>
            <span className={css(styles.layer, stylesPlayer({index: plyrIndex, style: 'backgroundColor'}).player)}></span>
            <img className={css(styles.image)} src={`/api/card/${this.props.details[index].src}`} />
          </span>
        );
      }
      matrix.push(<div key={`line_${i}`} className={css(styles.line)}>{line}</div>);
    }
    return matrix;
  }
  renderMoveResult(plyrIndex, first, second, hit) {
    var matrix = [];
    for (var i=0; i<this.state.matrix.y; i++) {
      var line = [];
      for (var k=0; k<this.state.matrix.x; k++) {
        const index = (this.state.matrix.x*i)+k;
        line.push(
          <span className={css(styles.card, !(index === first || index === second)?styles.dark2:hit?stylesPlayer({index: plyrIndex, style: 'backgroundColor'}).player:styles.white)} key={`card_${index}`}>
          </span>
        );
      }
      matrix.push(<div className={css(styles.line)}>{line}</div>);
    }
    return matrix;
  }
  renderMove(move, turn) {
    var plyrIndex = this.props.players.findIndex((plyr) => plyr.id === move.player.id);
    return (
      <div className={css(styles.gridMove)} key={`renderMove_${turn}`}>
        <div className={css(styles.gridMoveLeft)}>
          <div>{turn}</div>
          <div className={css(stylesPlayer({index: plyrIndex, style: 'color'}).player)}>
            <div>{move.player.nickname}</div>
            <div>{move.message}</div>
            <div>{move.time.toFixed(1)}</div>
          </div>
        </div>
        <div>
          {this.renderMoveResult(plyrIndex, move.firstMove, move.secondMove, move.message === 'Hit!')}
        </div>
      </div>
    );
  }
  render () {
    return (
      <div className={css(styles.gridMaster)}>
        <div>
          <div className={css(styles.title)}>Score</div>
          <div className={css(styles.finalInfos)}>
            <div>
              {this.renderFinalResult()}
            </div>
            <div className={css(styles.rightInfos)}>
              <table className={css(styles.table)}>
                {this.state.ranking.map((plyr, index) => this.renderRanking(plyr, index))}
              </table>
              <span>Playing Time: {this.props.matchTime}</span>
            </div>
          </div>
        </div>
        <div className={css(styles.gridMoves)}>
          <div className={css(styles.title)}>Moves</div>
          <DashedList items={this.props.moves.map((mv, index) => this.renderMove(mv, index+1))} />
        </div>
      </div>
    );
  }
}

ModalFinishGame.propTypes = propTypes;
ModalFinishGame.defaultProps = defaultProps;

export default ModalFinishGame;