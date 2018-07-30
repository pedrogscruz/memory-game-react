import React, { Component } from 'react';
import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import { styles } from './ConfigStyles';

import { fetchPlayers, createPlayer, verifyPassword } from '../../../actions/player'
import { saveConfig } from '../../../actions/config'

import { AwesomeButton } from 'react-awesome-button';

import SelectBox from '../../common/SelectBox';
import PlayerContainer from '../../forms/PlayerContainer';

class Config extends Component {
	constructor (props) {
    super(props);
    this.action = this.action.bind(this);
    this.verify = this.verify.bind(this);
		this.state = {
      list: [],
      playersNumber: 2,
      players: [],
      timePerMove: 5,
      cardsQty: 16,
      error: []
		}
  }
  componentWillMount() {
    const { fetchPlayers } = this.props;
    fetchPlayers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.allPlayers)
      this.setState({list: nextProps.allPlayers});
  }
  goToGame() {
    const { saveConfig, history } = this.props,
    {playersNumber, players, timePerMove, cardsQty} = this.state;
    saveConfig({playersNumber, players, timePerMove, cardsQty}, () => history.push("/game"))
  }
  action (error) {
    const { createPlayer } = this.props;
    if (error.length>0)
      this.setState({error});
    else {
      var i=0;
      this.state.players.map((plyr, index) => {
        if (plyr.exists === false)
          createPlayer(plyr.nickname, plyr.password, () => {
            i++;
            if (i === this.state.players.length)
              this.goToGame();
          });
        else
          i++;
        if (i === this.state.players.length)
          this.goToGame();
      })
    }
  };
  verify () {
    const { verifyPassword } = this.props;
    var error = [], i=0;
    this.state.players.map((plyr, index) => {
      if (plyr.nickname === '') {
        error.push({index, message: 'Preencha o campo Nickname'});
        i++;
      }
      else if (plyr.id) {
        verifyPassword(plyr.id, plyr.password, (ok) => {
          if (!ok)
            error.push({index, message: 'Senha do jogador incorreta'});
          i++;
          if (i === this.state.players.length)
            this.action(error);
        });
      }
      else if (plyr.password === ''){
        error.push({index, message: 'Crie uma senha para jogador'});
        i++;
      }
      else if (plyr.password != plyr.rpassword){
        error.push({index, message: 'As senhas não batem'});
        i++;
      }
      else
        i++;
      if (i === this.state.players.length)
        this.action(error);
    });
  }
	render () {
		return (
			<div className={css(styles.squares)}>
				<div className={css(styles.grid)}>
					<div className={css(styles.options)}>
  					<div className={css(styles.title)}>Play</div>
            <div className={css(styles.players)}>
              <label>Players</label>
              <SelectBox
                options={[
                  {value: '2', label: '2'},
                  {value: '3', label: '3'},
                  {value: '4', label: '4'}
                ]}
                onChange={e => this.setState({playersNumber: parseInt(e.target.value)})}
              />
            </div>
            <PlayerContainer
              qtd={parseInt(this.state.playersNumber)}
              list={this.state.list}
              error={this.state.error}
              changePlayers={(players) => this.state.players = [...players]}
            />
            <div className={css(styles.gameInfos)}>
              <label>Time per move</label>
              <SelectBox
                options={[
                  {value: '5', label: '5'},
                  {value: '10', label: '10'},
                  {value: '15', label: '15'},
                  {value: '20', label: '20'}
                ]}
                onChange={e => this.setState({timePerMove: parseInt(e.target.value)})}
              />
            </div>
            <div className={css(styles.gameInfos)}>
              <label>Number of cards</label>
              <SelectBox
                options={[
                  {value: '16', label: '16'},
                  {value: '24', label: '24'},
                  {value: '36', label: '36'},
                  {value: '56', label: '56'}
                ]}
                onChange={e => this.setState({cardsQty:  parseInt(e.target.value)})}
              />
            </div>
            <center style={{paddingTop: '1rem'}}>
              <AwesomeButton type="secondary" action={() => this.verify()}>GO!</AwesomeButton>
            </center>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    allPlayers: state.player.allPlayers
  }
}

export default connect(mapStateToProps, { fetchPlayers, createPlayer, verifyPassword, saveConfig })(Config);