'use strict'

var React = require('react');
var Counter = React.createClass({
  getInitialState: function(){
    return(
      {
        count_number: 0,
        interval: 0,
        interval_is_going: false
      }
    );
  },
  componentDidMount: function(){
    this._startCount();
  },
  _increaseCount: function(){
    this.setState({count_number: (this.state.count_number + 1)});
  },
  _startCount: function(){
    var interval = setInterval(() => {
      this._increaseCount();
    }, 1000);
    this.setState({interval: interval});
    this.setState({interval_is_going: true});
  },
  _stopCount: function(){
    clearInterval(this.state.interval);
    this.setState({interval_is_going: false});
  },
  render(){
    return (
      <div>
        {this.state.count_number}
        <button onClick={this._stopCount} disabled={!this.state.interval_is_going}>Stop</button>
        <button onClick={this._startCount} disabled={this.state.interval_is_going}>Go</button>
      </div>
    );
  }
})

module.exports = Counter;
