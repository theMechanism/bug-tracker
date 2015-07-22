ClientBugEventHandlers = function(App){
  handlers = {};
  handlers.close = function(e) {
    var parent = $(e.target).closest('.mech-bug-wrap');
    App.resizingFunctions.fromTo(parent, App.$domNodes.mechPullTab, function() {
      // App.$domNodes.mechBugMoreLess.unbind();
      App.$domNodes.wraps.removeClass('expanded');
      // App.$domNodes.mechBugErrorInfo.empty();
    });
  };
  handlers.showControlPanel = function() {
    App.resizingFunctions.fromTo(App.$domNodes.mechPullTab, App.$domNodes.controlPanel.parent);
  };
  handlers.menuSelect = function(e){
    e.preventDefault();
    App.setState({selected_menu_option: $(e.target).attr('href')});
  };
  handlers.bugSubmit = function(e) {
    e.preventDefault();
    var submitFields = {
      'bug[name]': App.$domNodes.controlPanel.bugName.val(),
      'bug[description]': App.$domNodes.controlPanel.bugDesc.val(),
      'bug[os]': navigator.platform,
      'bug[ua]': navigator.userAgent
    };   
    App.crossDomRPC.parentInfo(function(parentInfo){

      submitFields['bug[project_id]'] = parentInfo.projectID;
      submitFields['bug[url]'] = parentInfo.url;
      
      submitFields['bug[browser]'] = bowser.name;
      submitFields['bug[browser_version]'] = bowser.version;
      submitFields['bug[width]'] = parentInfo.width;
      submitFields['bug[height]'] = parentInfo.height;
      App.services.postBugToServer(submitFields);
    }); 
  };
  handlers.successfulBug = function(res){
    App.resizingFunctions.fromTo(App.$domNodes.controlPanel.parent, App.$domNodes.feedback.response);
    App.services.updateBugList();
  };
  handlers.bugErrors = function(res){
    App.$domNodes.feedback.errorInfo.detach();
    App.$domNodes.feedback.error.height('auto');
    $.each(res, function(index, error) {
      App.$domNodes.feedback.errorInfo.append('<div>' + error + '</div>');
    });

    $('.mech-bug-padding', App.$domNodes.feedback.error).append(App.$domNodes.feedback.errorInfo);

    App.$domNodes.controlPanel.form.trigger('reset');
    App.resizingFunctions.fromTo(App.$domNodes.controlPanel.parent, App.$domNodes.feedback.error);

  }
  return handlers;
}

    
      
