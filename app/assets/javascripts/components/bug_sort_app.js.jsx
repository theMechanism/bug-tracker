var BugSortApp = React.createClass({

  render: function() {
    return (
      <div>
        <BugEventTest filterUpdate={this.state.filterUpdate} />
        <BugFilter />
        <BugTable />
      </div>

    );
  },
  getInitialState: function(){
    var self = this;
    var filterUpdate = new Event();
    filterUpdate.attach(self);
    
    return {
      filterUpdate: filterUpdate
    }
  },
  componentDidMount: function(){
    // var self = this;
    // var filterUpdate = new Event();
    // filterUpdate.attach(self);

    // self.setState({filterUpdate: filterUpdate});
  },
  test: function(){
    console.log('inside parent component, test is called');
  }
});
