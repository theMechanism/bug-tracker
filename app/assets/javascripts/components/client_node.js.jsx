
var ClientNode = React.createClass({

  render: function() {
    var projectsTable = this.state.showProjects ? <ProjectsTable projects={this.props.projects} /> : '';

    var arrowIcon = this.state.showProjects ? "glyphicon glyphicon-arrow-up" : "glyphicon glyphicon-arrow-down";

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
        <h4>
          Projects 
          <a onClick={this.toggleProjectsShow}><span className={arrowIcon} aria-hidden="true"></span></a>
          <a onClick={this.showModal}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></a>
        </h4>
        { projectsTable }
        
      </div>

    );
  },
  getInitialState: function(){
    // console.l
    return {
      showProjects: false
    }
  },
  toggleProjectsShow: function(){
    this.setState({
      showProjects: !this.state.showProjects
    });
    // console.log(this.state.showProjects);
  },
  componentDidMount: function(){
    this.getInitialState();
  },
  showModal: function(){
    alert('this should be a modal that will let project manager add project to client');
  }
});
