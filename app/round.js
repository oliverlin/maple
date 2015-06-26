'use strict'

var React = require('react');
var NewRound = require('./new_round.js');

var Round = React.createClass({
  handleClick: function(){
    this.props.increaseRound();
  },
  render(){
    return (
      <div>
        current_round {this.props.round}
        <button onClick={this.handleClick}>Next Round</button>
      </div>
    );
  }
});

var Stage = React.createClass({
  getInitialState: function(){
    return(
      {
        current_round: 0,
        player: {
          name: 'Oliver',
          id: 1,
          order: 2
        },
        players: 4,
        is_player_round: false
      }
    )
  },
  componentDidMount: function(){
    this._check_player_round();
    setTimeout(this._check_player_round,0);
  },
  _startFirstRound: function(){
    this.setState({current_round: 1});
    setTimeout(this._check_player_round,0);
  },
  _increaseRound: function(){
    this.setState({current_round: (this.state.current_round + 1)});
    setTimeout(this._check_player_round,0);
  },
  _check_player_round: function(){
    var current_round = this.state.current_round;
    var player_order = this.state.player.order;
    var players = this.state.players;
    var is_player_round = (((current_round%players) == player_order) && (current_round >= player_order));
    this.setState({is_player_round: is_player_round});
  },
  render(){
    var msg;
    if (this.state.is_player_round) {
      msg = 'Your turn';
    } else {
      msg = 'Player ' + this.state.current_round + ' round';
    }
    return(
      <div>
        {msg}
        <Round round={this.state.current_round} increaseRound={this._increaseRound}/>
        <NewRound round={this.state.current_round} increaseRound={this._increaseRound}/>
      </div>
    )
  }
});


module.exports = Stage;
