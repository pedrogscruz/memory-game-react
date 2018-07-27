import React, { Component } from 'react';

import { css } from 'aphrodite/no-important';
import { styles } from './DashedListStyles';

import PropTypes from 'prop-types';

const propTypes = {
	items: PropTypes.array
}

const defaultProps = {
  items: []
};

class DashedList extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const {items} = this.props;
    return (
      <div className={css(styles.dashed)}>
        {items.map((itm, index) => (
          <div key={`item_${index}`} className={css(styles.container)}>
            {itm}
          </div>
        ))}
      </div>
    );
  }
}

DashedList.propTypes = propTypes;
DashedList.defaultProps = defaultProps;

export default DashedList;