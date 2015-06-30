var BugSortApp = React.createClass({

  render: function() {
    return (
      <div>
        <BugFilter admins={this.state.admins} projects={this.state.projects} statuses={['Open', 'Verify', 'Closed']} />
        <BugTable />
      </div>

    );
  },
  getInitialState: function(){
    var self = this;
    var dispatcher = new Dispatcher();
    dispatcher.attach(self);
    
    return {
      dispatcher: dispatcher,
      bugs: [],
      admins: [],
      projects: []
    }
  },
  componentDidMount: function(){
    var self = this;

    $.getJSON(this.props.bugs_path, function(bugs){
      self.setState({bugs: bugs});
      console.log('self.state.bugs');

      console.log(self.state.bugs);
    });
    $.getJSON(this.props.admins_path, function(admins){
      self.setState({admins: admins});
      console.log('self.state.admins');

      console.log(self.state.admins);
    });
    $.getJSON(this.props.projects_path, function(projects){
      self.setState({projects: projects});
      console.log('self.state.projects');

      console.log(self.state.projects);
    });
  },
  test: function(){
    console.log('inside parent component, test is called');
  }
});
