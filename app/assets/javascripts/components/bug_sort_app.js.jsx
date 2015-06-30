var BugSortApp = React.createClass({

  render: function() {
    var bugFilter, bugTable;
    if (this.state.admins && this.state.projects){
      bugTable = <BugTable dispatcher={this.state.dispatcher} bugs={this.state.bugs}/>;
      bugFilter = <BugFilter dispatcher={this.state.dispatcher} admins={this.state.admins} projects={this.state.projects} statuses={['Open', 'Verify', 'Closed']} />;
    } else {
      bugTable = '';
      bugFilter = '';
    }
    return (
      <div>
        {bugFilter}
        {bugTable}
      </div>

    );
  },
  getInitialState: function(){
    var self = this;
    var dispatcher = new Dispatcher();
    dispatcher.register(self);
    
    return {
      dispatcher: dispatcher
    }
  },
  componentDidMount: function(){
    var self = this;

    $.getJSON(this.props.bugs_path, function(bugs){
      self.setState({bugs: bugs});
      // console.log('self.state.bugs');

      // console.log(self.state.bugs);
    });
    $.getJSON(this.props.admins_path, function(admins){
      self.setState({admins: admins});
      // console.log('self.state.admins');

      // console.log(self.state.admins);
    });
    $.getJSON(this.props.projects_path, function(projects){
      self.setState({projects: projects});
      // console.log('self.state.projects');

      // console.log(self.state.projects);
    });
  }
  // ,
  // test: function(){
  //   console.log('inside parent component, test is called');
  // }, 
  // changeGroupBy: function(data){
  //   console.log('in sort app parent, passed this data: ');
  //   console.log(data);
  // }
});
