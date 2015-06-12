var ProjectsTable = React.createClass({

  render: function() {
    console.log('projects');
    console.log(this.props.projects);
    var projectNodes = this.props.projects.map(function(project){
      
      return (
        <ProjectNode project={project} key={project}/>
      );

    });
    return (
      
        <table className="table table-bordered" key={this.props.projects}>
          <tr>
            <th>Name</th>
            <th>Blurb</th>
            <th>Active?</th>
            <th>Tracker Exp Date</th>
            <th>Git Repo</th>
            <th>Dev Server</th>
            <th>Project Manager</th>
          </tr>
          { projectNodes }
        </table>
      
    );
  }
});
