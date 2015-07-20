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
      App.postToServer(submitFields);
    }); 
  };
  handlers.successfulBug = function(res){
    console.log('success!!');
  };
  handlers.bugErrors = function(res){
    console.log('oh shit');
    App.$domNodes.feedback.errorInfo.detach();
    App.$domNodes.feedback.error.height('auto');
    $.each(res, function(index, error) {
      App.$domNodes.feedback.errorInfo.append('<div>' + error + '</div>');
    });

    $('.mech-bug-padding', App.$domNodes.feedback.error).append(App.$domNodes.feedback.errorInfo);

    App.$domNodes.controlPanel.form.trigger('reset');
    // App.$domNodes.mechBugFormName.val(makeArray['bug[name]']);

    App.resizingFunctions.fromTo(App.$domNodes.controlPanel.parent, App.$domNodes.feedback.error);

  }
  return handlers;
  // handlers.bugSubmit = function(e) {
  //   e.preventDefault();
  //     if (App.$domNodes.mechBugSubmit.hasClass('loading')) return;
  //     rpc.parentInfo(function(parentInfo) {
  //       var makeArray = {
  //         'bug[name]': $('#form-name').val(),
  //         'bug[description]': $('#form-description').val(),
  //         'bug[project_id]': parentInfo.projectID,
  //         'bug[url]': parentInfo.url,
  //         'bug[os]': navigator.platform,
  //         'bug[ua]': navigator.userAgent,
  //         'bug[browser]': bowser.name,
  //         'bug[browser_version]': bowser.version,
  //         'bug[width]': parentInfo.width,
  //         'bug[height]': parentInfo.height
  //       };
  //       App.$domNodes.mechBugSubmit.addClass('loading');
  //       $.post('/bugs', makeArray)
  //         .done(function(data) {
  //           console.log(data);

  //           if (data.id) {
  //             App.$domNodes.mechBugInfo.detach();
  //             App.$domNodes.mechBugResponse.height('auto');

  //             App.$domNodes.mechBugID.text(data.id);
  //             App.$domNodes.mechBugUserName.text(data.name);
  //             App.$domNodes.mechBugDescription.text(data.description);
  //             App.$domNodes.mechBugURL.text(data.url);
  //             App.$domNodes.mechBugBrowser.text(data.browser);
  //             App.$domNodes.mechBugBrowserVersion.text(data.browser_version);
  //             App.$domNodes.mechBugWidth.text(data.width);
  //             App.$domNodes.mechBugHeight.text(data.height);
  //             App.$domNodes.mechBugCreated.text(data.created_at);
  //             App.$domNodes.mechBugUA.text(data.ua);
  //             App.$domNodes.mechBugOS.text(data.os);

  //             $('.mech-bug-padding', App.$domNodes.mechBugResponse).append(App.$domNodes.mechBugInfo);

  //             App.$domNodes.mechBugForm.trigger('reset');
  //             App.$domNodes.mechBugFormName.val(makeArray['bug[name]']);

  //             resizingFunctions.fromTo(App.$domNodes.mechBugReport, App.$domNodes.mechBugResponse);
  //           } else {
  //             App.$domNodes.mechBugErrorInfo.detach();
  //             App.$domNodes.mechBugError.height('auto');
  //             $.each(data, function(index, error) {
  //               App.$domNodes.mechBugErrorInfo.append('<div>' + error + '</div>');
  //             });

  //             $('.mech-bug-padding', App.$domNodes.mechBugError).append(App.$domNodes.mechBugErrorInfo);

  //             App.$domNodes.mechBugForm.trigger('reset');
  //             App.$domNodes.mechBugFormName.val(makeArray['bug[name]']);

  //             resizingFunctions.fromTo(App.$domNodes.mechBugReport, App.$domNodes.mechBugError);
  //           }

  //           App.$domNodes.mechBugSubmit.removeClass('loading');

  //           App.$domNodes.mechBugMoreLess.click(function() {
  //             var parent = $(this).closest(App.$domNodes.mechBugWraps);

  //             parent.toggleClass('expanded');

  //             parent.y = $('.mech-bug-padding', parent).outerHeight();

  //             rpc.resizeiFrame(parent.x, parent.y, true, function(response) {
  //               parent.x = response.x;
  //               parent.y = response.y;
  //               parent.width(response.x);
  //               parent.height(response.y);
  //               resizingFunctions.expand(parent);
  //             });
  //           });
  //         });
  //       App.cookieMonster.setName(makeArray['bug[name]']);
  //     });
  //   }
}

    
      
