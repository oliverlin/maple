'use strict'

var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

var Column = React.createClass({
  render(){
    return(
      <td>{this.props.number}</td>
    )
  }
});

var Row = React.createClass({
  render(){
    var columns = _.map(this.props.row_numbers, function(number){
      return(<Column number={number}/>)
    });
    return(
      <tr>{columns}</tr>
    )
  }
});

var Bingo = React.createClass({
  getInitialState: function(){
    var numbers_for_view = [];
    return {numbers: numbers_for_view}
  },
  componentDidMount: function(){
    this.getRandomNumbers();
  },
  getRandomNumbers: function(){
    var numbers = [];
    var count = $('.count-input').val();
    var count_of_columns_in_row = count || 3;
    var amount = count_of_columns_in_row * count_of_columns_in_row;
    var isNumberDuplicated = function(number){
      return(_.contains(numbers, number))
    };
    _.times(amount, function(){
      var pushNumber = function(){
        var random_number = _.random(0, 100);
        if(isNumberDuplicated(random_number)){
          pushNumber();
        } else {
          numbers.push(random_number);
        }
      };
      pushNumber();

    });
    this.setState({numbers: this.NumbersForView(numbers, count_of_columns_in_row)});
  },
  handleClick: function(){
    this.getRandomNumbers();
    console.table(this.state.numbers);
  },
  NumbersForView: function(numbers, row){
    var numbers_for_view = [];
    var numbers_in_row = [];
    _.each(numbers, function(number, i){
      numbers_in_row.push(number);
      if(((i + 1) % row) == 0){
        numbers_for_view.push(numbers_in_row);
        numbers_in_row = [];
      }
    });
    return numbers_for_view;
  },
  render() {
    var rows = _.map(this.state.numbers, function(row_numbers){
      return( <Row row_numbers={row_numbers}/> )
    });
    return(
      <div>
        <table>{rows}</table>
        <div onClick={this.handleClick}>Refresh</div>
        <input className="count-input" type="number" placeholder="Numbers in each row" max="9" min="1"/>
      </div>
    )
  }
});

module.exports = Bingo;
