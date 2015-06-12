var ProjectNode = React.createClass({

  render: function() {
    return (
      <tr>
        <td><a href={this.props.project.project_path}>{ this.props.project.name}</a></td>
        <td>{ this.props.project.blurb}</td>
        <td>{ this.props.project.active}</td>
        <td>{ this.props.project.expiration}</td>
        <td><a href={this.props.project.git_repo_url}>{ this.props.project.git_repo_url.substring(0, 14)}</a></td>
        <td><a href={this.props.project.dev_server_url}>{ this.props.project.dev_server_url.substring(0, 14)}</a></td>
        <td><a href={"mailto:" + this.props.project.project_manager_email}>{ this.props.project.project_manager_name}</a></td>
      </tr>
    );
  }
});