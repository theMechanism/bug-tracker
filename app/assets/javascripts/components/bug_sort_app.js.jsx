var BugSortApp = React.createClass({

  render: function() {
    return (
      <div>
        <BugFilter />
        <BugTable />
      </div>

    );
  },
  getInitialState: function(){
    var self = this;
    var dispatcher = new Dispatcher();
    dispatcher.attach(self);
    
    return {
      dispatcher: dispatcher
    }
  },
  componentDidMount: function(){
    var self = this;
    $.getJSON(this.props.bugs_path, function(bugs){
      self.setState({bugs: bugs});
      console.log('self.state.bugs');

      console.log(self.state.bugs);
    });
  },
  test: function(){
    console.log('inside parent component, test is called');
  }
});
