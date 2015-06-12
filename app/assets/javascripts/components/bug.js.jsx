var Bug = React.createClass({

  render: function() {
    var adminsOptions = this.props.admins.map(function(admin){
      return (
        <option value={admin.id}>{admin.name}</option> 
      );
    });

    return (
      <div className="bug">
        <h4 className="bugName">
          {this.props.name}
        </h4>
        <select className="assignAdmin form-control" onChange={this.handleChange} value={this.state.assignedAdmin}>
          { adminsOptions }
        </select>
      </div>
    );
  },
  getInitialState: function(){
    return {
      assignedAdmin: this.props.assignedAdmin
    }
  },
  handleChange: function(event){
    this.setState({assignedAdmin: event.nativeEvent.target.value});
  }
});
