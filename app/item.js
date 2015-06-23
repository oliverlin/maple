'use strict';

var React = require('react');

var ItemBox = React.createClass({
  getInitialState: function() {
    return (
      {data: [
        {name: "Oliver", age: '28'},
        {name: "KK", age: '23'}
      ]}
    )
  },
  ItemSubmit: function(item){
    var data = this.state.data;
    data.push(item);
    this.setState({data: data});
  },
  _addAmount(){
    this.setState({
      amount: (this.state.amount + 1)
    });
  },
  render(){
    return (
      <div>
        <ItemList data={this.state.data}/>
        <ItemForm onItemSubmit={this.ItemSubmit}/>
      </div>
    );
  }
});

var ItemForm = React.createClass({
  handle_submit: function(e){
    e.preventDefault();
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var age = React.findDOMNode(this.refs.age).value.trim();
    if (!age || !name) {
      return;
    }
    this.props.onItemSubmit({name: name, age: age});
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.age).value = 0;
  },
  render(){
    return(
      <form className="commentForm" onSubmit={this.handle_submit}>
        <input type="text" ref="name" placeholder="Name"/>
        <input type="number" ref="age" placeholder="Age"/>
        <button type="submit" value="Go"></button>
      </form>
    );
  }
})

var Item = React.createClass({
  render(){
    return(
      <div className="person">
        <span>Name: </span>
        <span>{this.props.name}</span>
        <div></div>
        <span>Age: </span>
        <span>{this.props.age}</span>
        <hr/>
      </div>
    );
  }
});

var ItemList = React.createClass({
  render(){
    var items = this.props.data.map(function(item, index){
      return (<Item name={item.name} age={item.age}/>)
    });
    return (
      <div className="item-list">
        {items}
      </div>
    );
  }
});

module.exports = ItemBox;
