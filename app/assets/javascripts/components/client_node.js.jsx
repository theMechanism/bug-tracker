var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ClientNode = React.createClass({

  render: function() {
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
        <ProjectsTable projects={this.props.projects} />
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


});
