<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="mech-bug-track.css">
    </head>
    <body>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Bug Tracker</a>
        </div>
      </div>
    </div>

    <div class="container">

      <div class="row">
        <div class="col-md-12">
          <p>This is a test page for the bug tracker.</p>
        </div>
      </div>

    </div> <!-- /container -->

       <div id="mech-bug-tracker">
          <div id="mech-pull-tab" class="mech-pull-tab">
            <span>Report Bug</span>
          </div>
          <div class="mech-bug-wrap">
            <div id="mech-bug-close" class="mech-bug-close">x</div>
            <form id="bugTrackForm" role="form" action="params.php" method="post" target="_blank">
              <div class="form-group">
                <label for="formName">Name</label>
                <input type="text" name="name" class="form-control" id="formName" placeholder="Enter name">
              </div>
              <div class="form-group">
                <label for="fromDescription">Description</label>
                <textarea class="form-control" name="description" id="fromDescription" placeholder="Enter description"></textarea>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>


        <script src="mech-bug-tracker.js?projectID=23"></script>
    </body>
</html>
