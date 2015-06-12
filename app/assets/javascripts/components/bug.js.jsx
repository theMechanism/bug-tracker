var Bug = React.createClass({

  render: function() {
    var adminsOptions = this.props.admins.map(function(admin){
      return (
        <div>
          <p>
            {admin.name}
          </p>
          <p>
            {admin.id}
          </p>
        </div>
      );
    });

    return (
      <div className="bug">
        <h4 className="bugName">
          {this.props.name}
        </h4>
        { adminsOptions }
      </div>

    );
  }
});
