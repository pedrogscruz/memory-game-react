import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './PlayerContainerStyles';

import AutoComplete from '../common/AutoComplete';
import InputField from '../common/InputField';

const propTypes = {
	list: PropTypes.array.isRequired,
	qtd: PropTypes.number.isRequired,
	changePlayers: PropTypes.func.isRequired
}

const defaultProps = {
  error: [],
  list: [],
  qtd: 0,
  changePlayers: (players) => {}
};

class PlayerContainer extends React.Component {
  constructor (props) {
    super(props);
    this.playerSelectNickname = this.playerSelectNickname.bind(this);
    this.playerChangeNickname = this.playerChangeNickname.bind(this);
    this.renderOldUser = this.renderOldUser.bind(this);
    this.renderNewUser = this.renderNewUser.bind(this);
    this.state = {
      players: []
    };
  }
  componentWillMount() {
    const { qtd } = this.props;
    var players = [];
    for (var i=0; i<qtd; i++)
      players.push({
        nickname: '',
        password: '',
        exists: null
      });
    this.setState({ players });
    this.props.changePlayers(this.state.players);
  }
  componentWillReceiveProps(nextProps) {
    var players = [...this.state.players];
    if (nextProps.qtd > this.props.qtd) {
      for (var i=this.props.qtd; i<nextProps.qtd; i++)
        players.push({
          nickname: '',
          password: '',
          exists: null
        });
    }
    else if (nextProps.qtd != 0)
      players = players.slice(0, nextProps.qtd)
    this.setState({ players });
  }
  verifyError (index) {
    var findError = this.props.error.find((err) => err.index === index);
    if (findError)
      return (
        <div className={css(styles.error)}>{findError.message}</div>
      );
  }
  playerSelectNickname (res, index) {
    this.state.players[index] = {...res};
    this.state.players[index].exists = true;
    this.props.changePlayers(this.state.players);
    this.setState({});
  }
  playerChangeNickname (res, index) {
    if (res.id)
      this.playerSelectNickname(res, index);
    else {
      if (res.nickname) {
        this.state.players[index].nickname = res.nickname;
        this.state.players[index].exists = false;
      }
      else
        this.state.players[index].exists = null;
      this.props.changePlayers(this.state.players);
      this.setState({});
    }
  }
  renderOldUser(plyr, index) {
    var response = [];
    response.push(
      <tr key={`key_${index}`}>
        <td>Password</td>
        <td>
          <InputField
            type={'password'}
            onChange={(e) => {
              this.state.players[index].password = e.target.value
              this.props.changePlayers(this.state.players);
            }}
          />
        </td>
      </tr>
    );
    response.push(
      <tr key={`keyDown_${index}`}>
        <td colSpan={2}>
          <div className={css(styles.line3)}>
            <div>Ranking: {plyr.ranking}</div>
            <div>Loses: {plyr.wins}</div>
            <div>Wins: {plyr.loses}</div>
          </div>
        </td>
      </tr>
    );
    return response;
  }
  renderNewUser(index) {
    var response = [];
    response.push(
      <tr key={`keyNew_${index}`}>
        <td>Create Password</td>
        <td>
          <InputField
            type={'password'}
            onChange={(e) => {
              this.state.players[index].password = e.target.value
              this.props.changePlayers(this.state.players);
            }}
          />
        </td>
      </tr>
    );
    response.push(
      <tr key={`keyNewDown_${index}`}>
        <td>Repeat Password</td>
        <td>
          <InputField
            type={'password'}
            onChange={(e) => {
              this.state.players[index].rpassword = e.target.value
              this.props.changePlayers(this.state.players);
            }}
          />
        </td>
      </tr>
    );
    return response;
  }
  renderPlayer (plyr, index) {
    return (
      <div className={css(styles.container, index%2==0?styles.dark1:styles.dark2)} key={index}>
        <table className={css(styles.table)}>
          <tr>
            <td>Nickname</td>
            <td>
            <AutoComplete
              keys={{id: 'id', name: 'nickname'}}
              results={this.props.list}
              onChange={(res) => this.playerChangeNickname(res, index)}
              onSelect={(res) => this.playerSelectNickname(res, index)}
            />
            </td>
          </tr>
          {
            plyr.exists === true ?
              this.renderOldUser(plyr, index)
            : plyr.exists === false ?
              this.renderNewUser(index)
            : null
          }
        </table>
        {this.verifyError(index)}
      </div>
    );
  }
  render () {
    const { list, qtd } = this.props;
    return (
      <div className={css(styles.dashed)}>
        {this.state.players.map((plyr, index) => this.renderPlayer(plyr, index))}
      </div>
    );
  }
}

PlayerContainer.propTypes = propTypes;
PlayerContainer.defaultProps = defaultProps;

export default PlayerContainer;