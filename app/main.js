/* main.js */

'use strict';

var React = require('react');
var $ = require('jquery');
var Item = require('./item.js');

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
            </div>
        );
    }
});

React.render(<Main />, document.body);
