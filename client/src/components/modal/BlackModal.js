import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './BlackModalStyles';

import { AwesomeButton } from 'react-awesome-button';
import PropTypes from 'prop-types';

const propTypes = {
	inside: PropTypes.element,
	show: PropTypes.bool
}

const defaultProps = {
  inside: <div></div>,
	show: false
};

class BlackModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      display: 'none',
      opacity: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show)
      this.setState({display: nextProps.show ? 'block' : 'none'}, () => this.setState({opacity: nextProps.show ? 1 : 0}));
  }
  render() {
    const {inside, show} = this.props;
    return (
      <div className={css(styles.behind)} style={this.state}>
        <div className={css(styles.container)}>
          <div className={css(styles.cell)}>
            <div className={css(styles.inside)}>
              {show ? inside : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlackModal.propTypes = propTypes;
BlackModal.defaultProps = defaultProps;

export default BlackModal;