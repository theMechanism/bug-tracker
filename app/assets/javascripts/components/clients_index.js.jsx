var ClientsIndex = React.createClass({

  render: function() {
    // console.log(this.props);
    var clientNodes = this.props.clients.map( function(client){
      return (
        <ClientNode client={client} projects={client.projects} />
        
      );
    });
    return (
      <div>
        {clientNodes}
        <Modal content_urls={this.props.modal_content_urls} />
      </div>
    );
  }
});
