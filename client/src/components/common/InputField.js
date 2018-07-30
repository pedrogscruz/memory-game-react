import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './InputFieldStyles';

const propTypes = {
  type: PropTypes.oneOf(['text', 'password']),
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
}

const defaultProps = {
  placeholder: '',
  type: 'text'
};

class InputField extends Component {
  render () {
    const { props } = this;
    return (
      <input className={css(styles.input, props.aphroditeStyle ? props.aphroditeStyle : null)} {...props} />
    );
  }
}  

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;