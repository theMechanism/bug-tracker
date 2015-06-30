var BugTable = React.createClass({

  changeGroupBy: function(e){
    this.setState({groupBy: e.target.value});
  },
  arrangeBugRows: function(){
    var self = this;
    return _.sortBy(self.state.bugs, function(b){ 
      return b[self.state.groupBy];
    });
  },
  render: function() {
    var bugRows = this.arrangeBugRows().map(function(b){
      return (
        <tr>
          <td>
            admin #{b.admin_id}
          </td>
          <td>
            { b.status }
          </td>
          <td>
            Project #{b.project_id}
          </td>
        </tr>
      )
    });

    return (
      <div>
        <hr/>
        <select onChange={this.changeGroupBy}>
          <option value='admin_id'>admins</option>
          <option value='project_id'>projects</option>
          <option value='status'>status</option>
        </select>
        <hr/>
        {this.state.groupBy}
        <br/>
        <table>
          <tr>
            <th>
              Assigned Admin
            </th>
            <th>
              Status
            </th>
            <th>
              Project
            </th>
          </tr>
          {bugRows}
        </table>
      </div>
    );
  },
  getInitialState: function(){
    return {
      bugs: {},
      groupBy: 'admin_id'
    };
  },
  componentDidMount: function(){
    var self = this;
    $.getJSON('/dashboard/bugs', function(bugs){
      // console.log(bugs);
      self.setState({bugs: bugs});
    });
  }
});
