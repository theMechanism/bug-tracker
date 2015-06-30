var BugEventTest = React.createClass({

  render: function() {
    return (
      <div>
        <button onClick={this.notify}>Click to test the event</button>
      </div>
    );
  },
  componentDidMount: function(){
    var self = this;
    console.log(this.props);

    this.props.dispatcher.register(self);
  },
  test: function(){
    console.log('in child, event test, test is called');
  },
  notify: function(){
    this.props.dispatcher.notify('test');
  }
});
