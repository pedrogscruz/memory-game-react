import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './SelectBoxStyles';

const propTypes = {
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
}

const defaultProps = {
  placeholder: '',
  options: []
};

class SelectBox extends Component {
  renderOptions(optn, index) {
    return <option key={JSON.stringify(optn)+index} className={css(index%2===0?styles.optionDark1:styles.optionDark2)} value={optn.value}>{optn.label}</option>;
  }
  render () {
    const { props } = this;
    var copyProps = {...props};
    delete copyProps.options;
    return (
      <select className={css(styles.select, props.aphroditeStyle ? props.aphroditeStyle : null)} {...copyProps}>
        {props.options.map((optn, index) => this.renderOptions(optn, index))}
      </select>
    );
  }
}  

SelectBox.propTypes = propTypes;
SelectBox.defaultProps = defaultProps;

export default SelectBox;