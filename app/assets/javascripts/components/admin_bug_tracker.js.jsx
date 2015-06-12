var AdminBugTracker = React.createClass({
  propTypes: {
    admins: React.PropTypes.array,
    bugs: React.PropTypes.array
  },

  render: function() {

    var admins = this.props.admins;
    var bugNodes = this.props.bugs.map(function(bug){
      return (
        <Bug name={bug.name} admins={admins} />
      );
    });

    return (
      <div>
        <h1>Foo and bar and such</h1>
        < AdminBugLeaderBoard admins={this.props.admins} />
        { bugNodes }
      </div>
    );
  }
});
