var AdminBugAssigner = React.createClass({
  propTypes: {
    admins: React.PropTypes.array,
    bug: React.PropTypes.object
  },

  render: function() {
    
    return (
      <div>
        <div>Admins: {this.props.admins}</div>
        <div>Bug: {this.props.bug}</div>
      </div>
    );
  }
});
