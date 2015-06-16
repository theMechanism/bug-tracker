var Modal = React.createClass({

  render: function() {
    var showing = this.state.showing ? 'showing' : 'no show';

    var danger = this.current_content();
    return (
      <div>
        <div dangerouslySetInnerHTML={danger} />
        <button onClick={this.toggleShow} className="btn btn-default">Modal butttttton</button>
        <div dangerouslySetInnerHTML={danger} />
        <div className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body" dangerouslySetInnerHTML={danger} />
                
             
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
    return {
      showing: false,
      current_key: '',
      content_blocks: {}
    }
  },
  componentDidMount: function(){
    var self = this;
    var content_keys = _.keys(self.props.content_urls);
    var returnObj = {content_blocks: {}};
    var i = content_keys.length;
    var j = 0;
    _.each(content_keys, function(key){ 
      $.get(self.props.content_urls[key], function(block){
        returnObj.content_blocks[key] = block;
        j++;
        if (j === i){
          self.setState(returnObj);
        };
      });
    });  
  },
  toggleShow: function(){
    var first_key = _.keys(this.props.content_urls)[0];
    this.setState({current_key: first_key});
    
    // this.setState({current_content: current_content});
    // console.log(this.state);
    $('.modal').modal();
  },
  current_content: function(){
    // console.log('inside current_content function'); 
    // console.log(this.state.current_content);
    var content = this.state.content_blocks[this.state.current_key];
    console.log(content);
    console.log('setting sate?')
    console.log(this.state);
    return {__html: content};
  }
});
