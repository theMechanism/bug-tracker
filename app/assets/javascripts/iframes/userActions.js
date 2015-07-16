userActions = {
  handleClose: function(e) {
    var parent = $(e.target).closest('.mech-bug-wrap');
    resizingFunctions.fromTo(parent, mechPullTab, mechBugTracker, function() {
      mechBugMoreLess.unbind();
      mechBugWraps.removeClass('expanded');
      mechBugErrorInfo.empty();
    });
  }

}

 