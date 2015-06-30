var BugFilter = React.createClass({

  getInitialState: function () {
      return {
        options: {
          admins: [{name: 'Avi', id: 1}, {name:'Dhruv', id:2}, {name:'Mystery Man', id:3}],
          statuses: ['Open', 'Verify', 'Closed'],
          projects: [{name:'Rhinestones', id:1}, {name:'Undies', id:2}, {name:'Chicken Bait', id:3}]
        },
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
      var options = Object.getOwnPropertyNames(self.state.options);
      return self.mapOptionsToSelect(options);
    },
    mapToSelectB: function(){
      var optionSelect = [<option value='All'>All</option>];
      var self = this;
      var options = self.state.options[self.state.currentlySelected]
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
          <select onChange={this.handleOptionSelection}>
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
    handleOptionSelection: function(event){
      this.setState({currentlySelected: event.target.value});
      var foo = this.state.currentlySelected;
      console.log(foo);
    },
    handleTextInput: function(event){
      this.setState({filterText: event.target.value});
    }

});
