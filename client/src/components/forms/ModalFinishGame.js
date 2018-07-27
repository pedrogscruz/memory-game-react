import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './ModalFinishGameStyles';

import { AwesomeButton } from 'react-awesome-button';
import PropTypes from 'prop-types';

import DashedList from '../lists/DashedList';

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

class ModalFinishGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }
  render () {
    return (
      <div>
        <div>
        </div>
      </div>
    );
  }
}

ModalFinishGame.propTypes = propTypes;
ModalFinishGame.defaultProps = defaultProps;

export default ModalFinishGame;