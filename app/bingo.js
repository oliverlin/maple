'use strict'

var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

var Column = React.createClass({
  render(){
    return(
      <td>
        <div className="number">{this.props.number}</div>
        <input type="number" data-value={this.props.number}/>
      </td>
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
    var count_of_columns_in_row = count || 5;
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
  _group_numbers: function(numbers){
    var array = [];
    for(var i=0;i<5;i++){
      var sub_array = [];
      for(var j=0;j<5;j++){
        sub_array.push(numbers[(5*i)+j]);
      }
      array.push(sub_array);
    }
    return array;
  },
  _hasDuplicatedNumbers: function(){
    var isInt = function (n){
      return Number(n)===n && n%1===0;
    }
    var numbers = this.state.numbers;
    var has_duplicated_numbers = false;
    var view = this.getDOMNode();
    var $inputs = $(view).find('table').find('input');
    var numbers = _.map($inputs, function(input){
      var value = parseInt($(input).val());
      if( isInt(value) ){
        return value;
      } else {
        has_duplicated_numbers = true;
        return undefined;
      }
    });
    var has_incorrect_numbers = (numbers.length != 25)
    if (has_incorrect_numbers || has_duplicated_numbers){
      return true;
    } else{
      this.setState({numbers: this._group_numbers(numbers)})
      return false;
    }
  },
  componentDidUpdate: function(){
    var s =  _.flatten(this.state.numbers);
    this._checkDuplicated(s);
  },
  _checkDuplicated: function(numbers){
    var pickedNumbers = [];
    var view = this.getDOMNode();
    _.each(numbers, function(number, i){
      if (_.contains(pickedNumbers, number)){
        $(view).find("input[data-value=" + number + "]").css('background', 'red');
      } else {
        pickedNumbers.push(number);
      }
    })
  },
  _handleSubmit: function(){
    var hasDuplicatedNumbers = this._hasDuplicatedNumbers();
    if (hasDuplicatedNumbers){
      console.log('number incorrect');
    } else {
      console.log('numberFrezz');
    }

  },
  _handleClick: function(){
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
        <div onClick={this._handleClick}>Refresh</div>
        <div onClick={this._handleSubmit}>Submit</div>
        <input className="count-input" type="number" placeholder="Numbers in each row" max="9" min="1"/>
      </div>
    )
  }
});

module.exports = Bingo;
