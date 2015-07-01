var BugSortApp = React.createClass({

  render: function() {
    var bugFilter, bugTable;
    if (this.state.admins && this.state.projects){
      bugTable = <BugTable dispatcher={this.state.dispatcher} bugs={this.state.bugs} admins={this.state.admins} projects={this.state.projects} urls={this.props}/>;
      bugFilter = <BugFilter dispatcher={this.state.dispatcher} admins={this.state.admins} projects={this.state.projects} statuses={['Open', 'Verify', 'Closed']} groups={['admins', 'projects', 'statuses']} />;
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
    });
    $.getJSON(this.props.admins_path, function(admins){
      self.setState({admins: admins});
    });
    $.getJSON(this.props.projects_path, function(projects){
      self.setState({projects: projects});
    });
  }
});
