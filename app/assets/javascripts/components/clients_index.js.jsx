var ClientsIndex = React.createClass({

  render: function() {
    // console.log(this.props);
    return (
      <div>
        <ClientsList clients={this.props.clients} />
      </div>
    );
  }
});
