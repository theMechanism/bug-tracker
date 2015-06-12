var AdminBugLeaderBoard = React.createClass({
  propTypes: {
    admins: React.PropTypes.array
  },

  render: function() {
    var adminRows = this.state.admins.map(function(admin){
      return (
        <tr key={admin.id}>
          <td>{admin.name}</td>
          <td>{ admin.bugs_count }</td>
        </tr>
      );
    });
    return (
      <table className="table">
        <tr>
          <th>Member</th>
          <th># of Bugs Assigned</th>
        </tr>
        { adminRows }
      </table>
    );
  },
  getInitialState: function(){
    return {
      admins: this.props.admins
    }
  }
});
