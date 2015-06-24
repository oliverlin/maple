/* main.js */

'use strict';

var React = require('react');
var $ = require('jquery');
var Item = require('./item.js');
var Counter = require('./counter.js');

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
            </div>
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

React.render(<Main />, document.body);
