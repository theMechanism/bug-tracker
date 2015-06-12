var ClientsIndex = React.createClass({

  render: function() {
    // console.log(this.props);
    return (
      <div>
        <h2>Welcome to ClientsIndex component</h2>
        <ClientsList clients={this.props.clients} />
      </div>
    );
  }
});
