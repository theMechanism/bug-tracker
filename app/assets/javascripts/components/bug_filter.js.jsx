var BugFilter = React.createClass({

  getInitialState: function () {
    return {
      currentlySelected: 'admins',
      filterText: ''
    }
  },
  componentDidMount: function(){
    var self = this;
    this.props.dispatcher.register(self);
  },
  mapOptionsToSelect: function (options) {
    var self = this;
    var optionSelect = options.map(function(option) {
      var value, display;
      if (option.id){
        value = self.state.currentlySelected.slice(0, -1) + '_' + option.id;
        display = option.name;
      } else {
        value = option;
        display = option;
      }
      return (
        <option value={value}>{display}</option>
      );
    });
    return optionSelect;
  },
  mapOptionsToSelectA: function(){
    var self = this;
    var options = self.props.groups;
    return self.mapOptionsToSelect(options);
  },
  mapToSelectB: function(){
    var optionSelect = [<option value='all'>All</option>];
    var self = this;
    var options = self.props[self.state.currentlySelected]
    optionSelect.push(self.mapOptionsToSelect(options));
    return optionSelect;
  },
  render: function() {

    var self = this;      
    var selectB = this.mapToSelectB();
    var selectA = this.mapOptionsToSelectA();

    return (
      <div className="bugsFilter">
        <label for="">Group Bugs By:</label>
        <br/>
        <select onChange={this.handleGroupBySelection}>
          {selectA}
        </select>
        <hr/>
        <label for="">Filter for:</label>
        <br/>
        <select onChange={this.handleFilterForSelection}>
          {selectB}
        </select>
        <hr/>
        <label for="">Search text for:</label>
        <input type="text" value={this.state.filterText} onChange={this.handleTextInput}/>
      </div>
    );
  },
  handleGroupBySelection: function(event){
    this.setState({currentlySelected: event.target.value});
    this.props.dispatcher.notify('changeGroupBy', event.target.value);
  },
  handleFilterForSelection: function(e){
    //  do we need to store this state? perhaps
    // this.setState({currentFilterFor: e.target.value});
    this.props.dispatcher.notify('changeFilterFor', e.target.value);
  },
  handleTextInput: function(e){
    this.setState({filterText: e.target.value});
    this.props.dispatcher.notify('updateFilterText', e.target.value);
  }

});
