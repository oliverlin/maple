/* main.js */

'use strict';

var React = require('react');
var $ = require('jquery');
var Item = require('./item.js');
var Counter = require('./counter.js');
var Round = require('./round.js');
var CounterToptal = require('./counter_toptal.js');

var Main = React.createClass({
    getInitialState: function() {
        return {
          switch: true,
          items: [
            {
              name: 'Olive',
              id: 1
            }
          ]
        };
    },
    _toggle() {
        this.setState({
            switch: !this.state.switch
        });
    },
    _appendItem() {

    },
    render() {
        return (
            <div>
                <Item />
                <Counter />
                <Round />
                <CounterToptal />
            </div>
        );
    }
});


var App = React.createClass({
  render(){
    var Child;
    switch (this.props.route) {
      case '': Child = Main; break;
      case 'item': Child = Item; break;
      case 'round': Child = Round; break;
      case 'counter': Child = Counter; break;
      default: Child = NoMatch;
    }

    return(
      <div>
        <div>{this.props.route || 'APP'}</div>
        <Child />
      </div>
    );
  }
});

var NoMatch = React.createClass({
  render(){
    return(
      <div>NoMatch</div>
    );
  }
});

window.Person = class Person {
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get name(){
    return `${this.firstName} ${this.lastName}`;
  }
  set name(name){
    var names = name.split(" ");
    this.firstName = names[0];
    this.lastName = names[1];
  }
};


function render () {
  var route = window.location.hash.substr(1);
  React.render(<App route={route} />, document.body);
}

window.addEventListener('hashchange', render);
render(); // render initially

