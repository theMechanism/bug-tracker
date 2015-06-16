var Modal = React.createClass({

  render: function() {
    var showing = this.state.showing ? 'showing' : 'no show';
    return (
      <div>
        <h2>
          I am a modal eat it.
        </h2>
        <p>
          am i showin?
          { showing }
          is my contne?
          
        </p>
      </div>
    );
  },
  getInitialState: function(){
    return {
      showing: false,
      current_content: null
    }
  },
  componentDidMount: function(){
    console.log('content_urls');
    console.log(this.props.content_urls);
  }
});
