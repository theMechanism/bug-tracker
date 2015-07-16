/* global jQuery, easyXDM, Modernizr, bowser, console, WebFont */

console.log('drop in the big boy');

WebFont.load({
  google: {
    families: ['Open Sans:400,700']
  }
});

// mechBugInit();
// var 
App = {};
function mechBugInit() {
  'use strict';

  var console = window.console || { log: function() {} };

    // console.log('start init');
    
    App.$domNodes = getDomNodes();
    // console.log('retrieved DomNodes ' +  App.$domNodes.mechBugTracker);
    
    App.views = [App.$domNodes.mechBugReport, App.$domNodes.mechBugResponse, App.$domNodes.mechBugError, App.$domNodes.mechPullTab];

    console.log(App.views);
    var cookieMonster = {
      setName: function(name) {
        $.cookie('mechBugTracker', name);
      },
      retrieveName: function() {
        return $.cookie('mechBugTracker');
      }
    };
    App.$domNodes.mechBugFormName.val(cookieMonster.retrieveName());

    App.$domNodes.mechPullTab.x = 180;

    $.each(App.views, function (index, element) {
      App.$domNodes.mechBugTracker.css({'visibility': 'hidden'}).append(element);
    });

    rpc.resizeiFrame(1000, 1000, false, function() {
      resizingFunctions.getDimensions(App.views, function() {
        console.log('check the views: ' + App.views);
        $.each(App.views, function (index, element) {
          element.detach().css({'visibility': 'visible'});
        });

        App.$domNodes.mechBugTracker.append(App.$domNodes.mechPullTab);
        rpc.resizeiFrame(App.$domNodes.mechPullTab.x, App.$domNodes.mechPullTab.y, false, function() {
          resizingFunctions.expand(App.$domNodes.mechPullTab);

          App.$domNodes.mechPullTab.click(function() {
            resizingFunctions.fromTo(App.$domNodes.mechPullTab, App.$domNodes.mechBugReport);
          });

          App.$domNodes.mechBugClose.click(handleClose);

          App.$domNodes.mechBugForm.submit(handleSubmit);
          App.$domNodes.mechBugSubmit.click(handleSubmit);
        });
      });
    });

    function handleClose(e) {
      var parent = $(e.target).closest('.mech-bug-wrap');
      resizingFunctions.fromTo(parent, App.$domNodes.mechPullTab, function() {
        App.$domNodes.mechBugMoreLess.unbind();
        App.$domNodes.mechBugWraps.removeClass('expanded');
        App.$domNodes.mechBugErrorInfo.empty();
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (mechBugSubmit.hasClass('loading')) return;
      rpc.parentInfo(function(parentInfo) {
        var makeArray = {
          'bug[name]': $('#form-name').val(),
          'bug[description]': $('#form-description').val(),
          'bug[project_id]': parentInfo.projectID,
          'bug[url]': parentInfo.url,
          'bug[os]': navigator.platform,
          'bug[ua]': navigator.userAgent,
          'bug[browser]': bowser.name,
          'bug[browser_version]': bowser.version,
          'bug[width]': parentInfo.width,
          'bug[height]': parentInfo.height
        };
        App.$domNodes.mechBugSubmit.addClass('loading');
        $.post('/bugs', makeArray)
          .done(function(data) {
            console.log(data);

            if (data.id) {
              App.$domNodes.mechBugInfo.detach();
              App.$domNodes.mechBugResponse.height('auto');

              App.$domNodes.mechBugID.text(data.id);
              App.$domNodes.mechBugUserName.text(data.name);
              App.$domNodes.mechBugDescription.text(data.description);
              App.$domNodes.mechBugURL.text(data.url);
              App.$domNodes.mechBugBrowser.text(data.browser);
              App.$domNodes.mechBugBrowserVersion.text(data.browser_version);
              App.$domNodes.mechBugWidth.text(data.width);
              App.$domNodes.mechBugHeight.text(data.height);
              App.$domNodes.mechBugCreated.text(data.created_at);
              App.$domNodes.mechBugUA.text(data.ua);
              App.$domNodes.mechBugOS.text(data.os);

              $('.mech-bug-padding', App.$domNodes.mechBugResponse).append(App.$domNodes.mechBugInfo);

              App.$domNodes.mechBugForm.trigger('reset');
              App.$domNodes.mechBugFormName.val(makeArray['bug[name]']);

              resizingFunctions.fromTo(App.$domNodes.mechBugReport, App.$domNodes.mechBugResponse);
            } else {
              App.$domNodes.mechBugErrorInfo.detach();
              App.$domNodes.mechBugError.height('auto');
              $.each(data, function(index, error) {
                App.$domNodes.mechBugErrorInfo.append('<div>' + error + '</div>');
              });

              $('.mech-bug-padding', App.$domNodes.mechBugError).append(App.$domNodes.mechBugErrorInfo);

              App.$domNodes.mechBugForm.trigger('reset');
              App.$domNodes.mechBugFormName.val(makeArray['bug[name]']);

              resizingFunctions.fromTo(App.$domNodes.mechBugReport, App.$domNodes.mechBugError);
            }

            App.$domNodes.mechBugSubmit.removeClass('loading');

            App.$domNodes.mechBugMoreLess.click(function() {
              var parent = $(this).closest(App.$domNodes.mechBugWraps);

              parent.toggleClass('expanded');

              parent.y = $('.mech-bug-padding', parent).outerHeight();

              rpc.resizeiFrame(parent.x, parent.y, true, function(response) {
                parent.x = response.x;
                parent.y = response.y;
                parent.width(response.x);
                parent.height(response.y);
                resizingFunctions.expand(parent);
              });
            });
          });
        cookieMonster.setName(makeArray['bug[name]']);
      });
    }

    
  // });
}