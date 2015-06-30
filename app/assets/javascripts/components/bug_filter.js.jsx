var BugFilter = React.createClass({

  getInitialState: function () {
      return {
        currentlySelected: 'admins',
        filterText: ''
      }
    },
    mapOptionsToSelect: function (options) {
      var self = this;
      var optionSelect = options.map(function(option) {
        var value, display;
        if (option.id){
          value = self.state.currentlySelected + option.id;
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
      var options = Object.getOwnPropertyNames(self.props);
      return self.mapOptionsToSelect(options);
    },
    mapToSelectB: function(){
      var optionSelect = [<option value='All'>All</option>];
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
          <select>
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
    },
    handleTextInput: function(event){
      this.setState({filterText: event.target.value});
    }

});
