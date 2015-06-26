'use strict'

var React = require('react');
class NewRound extends React.Component {
  constructor(props){
    super(props);
  }
  handleClick(){
    this.props.increaseRound();
  }
  render(){
    return(
      <div>
        current_round {this.props.round}
        <button onClick={this.handleClick.bind(this)}>Next Round</button>
      </div>
    );
  }
};

module.exports = NewRound;
