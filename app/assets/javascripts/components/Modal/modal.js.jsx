function getModalState(){
  return {
    showing: ModalStore.getShowing(),
    current_key: '',
    content_blocks: {}
  }
}


var Modal = React.createClass({

  render: function() {
    var showing = this.state.showing ? 'showing' : 'no show';

    var content = this.current_content();
    return (
      <div>
        <button onClick={this.toggleShow} className="btn btn-default">Modal butttttton</button>
        <div className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body" dangerouslySetInnerHTML={content} />
                
             
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  getInitialState: function(){
    return getModalState();
  },
  componentDidMount: function(){
    ModalStore.getContentBlocks( this.props.content_urls);
    this.setState( getModalState() ); 
  },
  toggleShow: function(){
    var first_key = _.keys(this.props.content_urls)[0];
    this.setState({current_key: first_key});
    $('.modal').modal();
  },
  current_content: function(){
    var content = this.state.content_blocks[this.state.current_key];
    return {__html: content};
  }
});
