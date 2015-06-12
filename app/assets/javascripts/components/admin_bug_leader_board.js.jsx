var AdminBugLeaderBoard = React.createClass({
  propTypes: {
    admins: React.PropTypes.array
  },

  render: function() {
    return (
      <div>
        <div>Admins: {this.props.admins}</div>
      </div>
    );
  }
});
