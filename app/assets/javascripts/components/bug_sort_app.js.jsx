var BugSortApp = React.createClass({

  render: function() {
    return (
      <div>
        <BugFilter />
        <BugTable />
      </div>

    );
  },
  componentDidMount: function(){
    console.log(this.props);
  }
});
