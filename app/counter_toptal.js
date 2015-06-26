'use strict'

var React = require('react');

var CounterToptal = React.createClass({
  displayName: 'Counter',
  getDefaultProps: function(){
    return {initialCount: 0};
  },
  getInitialState: function() {
    return {count: this.props.initialCount}
  },
  propTypes: {initialCount: React.PropTypes.number},
  tick() {
    this.setState({count: this.state.count + 1});
  },
  render() {
    return (
      <div>
        <button onClick={this.tick}>Click</button>
        Clicks: {this.state.count}
      </div>
    );
  }
});

module.exports = CounterToptal;
