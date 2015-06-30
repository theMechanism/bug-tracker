var BugTable = React.createClass({

  changeGroupBy: function(data){
    console.log('listened to changeGroupBy in BugTable, data is: ');
    console.log(data);
    var groupMap = {
      'admins': 'admin_id',
      'statuses': 'status',
      'projects': 'project_id'
    };

    this.setState({groupBy: groupMap[data]});
  },
  arrangeBugRows: function(){
    var self = this;
    return _.sortBy(self.props.bugs, function(b){ 
      return b[self.state.groupBy];
    });
  },
  render: function() {
    var self = this;
    var bugRows = self.arrangeBugRows().map(function(b){
      return (
        <tr key={'bug_' + b.id}>
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
        <h4>grouped by {this.state.groupBy} </h4>
        
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
          <tbody>
            {bugRows}
          </tbody>
          
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
