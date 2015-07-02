var BugTable = React.createClass({

  changeGroupBy: function(data){
    var groupMap = {
      'admins': 'admin_id',
      'statuses': 'status',
      'projects': 'project_id'
    };
    this.setState({groupBy: groupMap[data]});
  },
  changeFilterFor: function(data){
    this.setState({filterFor: data});
  },
  updateFilterText: function(data){
    this.setState({filterText: data});
  },
  groupBugRows: function(){
    var self = this;
    return _.sortBy(self.props.bugs, function(b){ 
      return b[self.state.groupBy];
    });
  },
  filterBugsForText: function(bugs){
    console.log('filtering for text in table');
    if (!this.state.filterText){
      return bugs;
    } 
    var self = this;
    var regEx = new RegExp(this.state.filterText,"i");
    
    return _.filter(bugs, function(b){
      var bText = _.clone(b);
      console.log('calling on admins for bug #' + b.id);
      bText.admin_id = self.getObjNameFromId('admins', b.admin_id);
      console.log('calling on projects for bug #' + b.id);
      bText.project_id = self.getObjNameFromId('projects', b.project_id);
      
      var vals = _.values(bText);
      return JSON.stringify(vals).match(regEx)
    });
  },
  filterBugRows: function(bugs){
    if (this.state.filterFor === 'all') {
      return bugs;
    }
    var self = this;
    var target = self.state.groupBy;
    var val = self.state.filterFor.match(/_/) ? Number(self.state.filterFor.split('_')[1]) : self.state.filterFor;

    return _.filter(bugs, function(bug){
      return bug[target] === val;
    });
  },
  getObjNameFromId: function(group_name, id){
    console.log(group_name, id);
    console.log('props too');
    console.log(this.props);

    var obj = _.findWhere(this.props[group_name], {id: id});
    return obj ? obj.name : '';
  },
  buildBugRows: function(bugs){
    var self = this;
    return bugs.map(function(b){
      return (
        <tr key={'bug_' + b.id}>
          <td>
            <a href={self.props.urls.bugs_path + '/' + b.id }>
              {b.name}
            </a>
          </td>
          <td>
            <a href={self.props.urls.projects_path + '/' + b.project_id }>
              {self.getObjNameFromId('projects', b.project_id)}
            </a>
          </td>
          <td>
            {b.description}
          </td>
          <td>
            { b.status }
          </td>
          <td>
            <a href={self.props.urls.admins_path + '/' + b.admin_id }>
              {self.getObjNameFromId('admins', b.admin_id)}
            </a>
          </td>
        </tr>
      )
    });
  },
  render: function() {
    var self = this;
    var grouped = self.groupBugRows();
    var filteredOnce = this.filterBugRows(grouped);
    var filterTwice = this.filterBugsForText(filteredOnce);
    var bugRows = this.buildBugRows(filterTwice);
    
    return (
      <div>
        
        <hr/>
        <h4>grouped by {this.state.groupBy} </h4>
        
        <br/>
        <table className="table">
          <tr>
            <th>
              Bug
            </th>
            <th>
              Project
            </th>
            <th>
              Description
            </th>
            <th>
              Status
            </th>
            <th>
              Assigned Admin
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
      groupBy: 'admin_id',
      filterFor: 'all'
    };
  },
  componentDidMount: function(){
    var self = this;
    this.props.dispatcher.register(self);
    console.log(this.props);
  }
});
