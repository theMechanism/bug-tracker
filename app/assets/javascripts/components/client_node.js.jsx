var ClientNode = React.createClass({

  render: function() {

    var projectNodes = this.props.projects.map(function(project){
      console.log(project);
      return (
        <ProjectNode project={project} key={project}/>
      );

    });

    return (
      <div className="well">
        <h3>{ this.props.client.name_of_co }</h3>

        <table className="table table-condensed">
          <tr>
            <th>Primary Contact</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Misc Company Info</th>
          </tr>
          <tr>
            <td>{ this.props.client.name_of_primary_contact }</td>
            <td>{ this.props.client.email  }</td>
            <td>{ this.props.client.phone }</td>
            <td>{ this.props.client.misc_info }</td>
          </tr>
        </table>

        <h4>Projects <a onClick={this.toggleProjectsShow}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></a></h4>
        <ReactCSSTransitionGroup transitionName="example">  
          <table className="table table-bordered">
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
        </ReactCSSTransitionGroup>
      </div>

    );
  },
  getInitialState: function(){
    return {
      showProjects: false
    }
  },
  toggleProjectsShow: function(){
    this.setState({
      showProjects: !this.state.showProjects
    });
    console.log(this.state.showProjects);
  }
});
