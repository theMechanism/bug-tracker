var BugTable = React.createClass({

  changeGroupBy: function(data){
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
  getObjNameFromId: function(group_name, id){
    var obj = _.findWhere(this.props[group_name], {id: id});
    return obj.name;
  },
  render: function() {
    var self = this;
    var bugRows = self.arrangeBugRows().map(function(b){
      return (
        <tr key={'bug_' + b.id}>
          <td>
            {self.getObjNameFromId('admins', b.admin_id)}
          </td>
          <td>
            { b.status }
          </td>
          <td>
            {self.getObjNameFromId('projects', b.project_id)}
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
