import React from 'react';

var Timer = React.createClass({
  getInitialState: function(){
    return { elapsed: 0, timer: false };
  },
  componentDidUpdate: function(){
    if (this.props.activated) {
      if (!this.state.timer)
        this.state.timer = setInterval(this.tick, 50);
    }
    else if (this.state.timer) {
      clearInterval(this.state.timer);
      this.state.timer = false;
    }
  },
  componentWillUnmount: function(){
    clearInterval(this.state.timer);
  },
  tick: function(){
    this.setState({elapsed: this.props.end - new Date()});
  },
  render: function() {
    var elapsed = Math.round(this.state.elapsed / 100);
    var seconds = (elapsed / 10).toFixed(1);
    console.log(seconds);
    if (seconds < 0 && this.props.finished) {
      clearInterval(this.state.timer);
      this.props.finished();
    }
    return <b>{seconds}</b>;
  }
});

export default Timer;