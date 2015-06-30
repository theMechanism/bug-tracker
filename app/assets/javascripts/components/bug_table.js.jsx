var BugTable = React.createClass({

  // changeGroupBy: function(data){
  //   console.log('listened to changeGroupBy in BugTable, data is: ')
  //   console.log(data)
  //   this.setState({groupBy: data});
  // },
  arrangeBugRows: function(){
    var self = this;
    return _.sortBy(self.props.bugs, function(b){ 
      return b[self.state.groupBy];
    });
    // return [{admin_id: 1, status: 'foo', project_id: 1}]
  },
  render: function() {
    var self = this;
    var bugRows = self.arrangeBugRows().map(function(b){
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
      groupBy: 'admin_id'
    };
  },
  componentDidMount: function(){
    var self = this;
    this.props.dispatcher.register(self);
    console.log('checking props post mount: ');
    console.log(this.props);
  }
});
