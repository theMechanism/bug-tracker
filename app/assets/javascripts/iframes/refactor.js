/* global jQuery, easyXDM, Modernizr, bowser, console, WebFont */

console.log('drop in the big boy');

WebFont.load({
  google: {
    families: ['Open Sans:400,700']
  }
});

// mechBugInit();
// var 
var App;
function mechBugInit() {
  'use strict';

  var console = window.console || { log: function() {} };

    App = new ClientBugApp(rpc);
    
    // Arbitrarily set to clients name-- is this the best use here? hold off
    // App.$domNodes.mechBugFormName.val(App.cookieMonster.retrieveName());

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

          App.addListeners();

        });
      });
    });


    
  // });
}