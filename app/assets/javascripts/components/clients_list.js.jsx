var ClientsList = React.createClass({

  render: function() {
    var clientNodes = this.props.clients.map( function(client){
      return (
        <ClientNode client={client} projects={client.projects} />
        
      );
    });
    
    return (
      <div>
        {clientNodes}
        <Modal />
      </div>
    );
  }
});
