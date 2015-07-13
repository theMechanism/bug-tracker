/* global jQuery, easyXDM, Modernizr, bowser, console, WebFont */

// WebFont.load({
//   google: {
//     families: ['Open Sans:400,700']
//   },
//   active: mechBugInit
// });

mechBugInit();

function mechBugInit() {
  'use strict';

  var console = window.console || { log: function() {} };

  jQuery(document).ready(function($) {

    var rpc = new easyXDM.Rpc({},
      {
          remote: {
              getCustomStructure: {},
              resizeiFrame: {},
              parentInfo: {}
          }
      });

    rpc.getCustomStructure('chicekn', function(foo){
      console.log(foo);
      rpc.getCustomStructure('another string?');
    });
    
    rpc.resizeiFrame(1000, 1000, false, function() {
      // getDimensions(views, function() {
      //   $.each(views, function (index, element) {
      //     element.detach().css({'visibility': 'visible'});
      //   });

      //   mechBugTracker.append(mechPullTab);
      //   rpc.resizeiFrame(mechPullTab.x, mechPullTab.y, false, function() {
      //     expand(mechPullTab);

      //     mechPullTab.click(function() {
      //       fromTo(mechPullTab, mechBugReport);
      //     });

      //     mechBugClose.click(handleClose);

      //     mechBugForm.submit(handleSubmit);
      //     mechBugSubmit.click(handleSubmit);
      //   });
      // });
    });

    

    function getDimensions (elements, callback) {
      rpc.parentInfo(function(data) {
        $.each(elements, function(index, element) {
          $(element).css({
            width: element.x || 'auto',
            height: element.y || 'auto'
          });
          var w = element.outerWidth(),
            h = element.outerHeight();

          element.x = (w < data.width) ? w : data.width;
          element.y = (h < data.height) ? h : data.height;

          element.height(element.y);
        });
        callback();
      });
    }
    function expand (element, afterExpand) {
      if(hasTransitions) {
        // timeout to allow iFrame size to adjust before transition starts
        setTimeout(function() {
          element
            .addClass('active')
            .bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
              if (afterExpand) afterExpand();
              $(this).unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });
        }, 10);
      } else {
        $(element).animate({ 'left': '0' }, 400, afterExpand);
      }
    }
    function fromTo (from, to, afterMinimize, afterExpand) {
      mechBugTracker.append(to);
      getDimensions([from, to], function() {
        var tWidth = (from.x < to.x) ? to.x : from.x,
          tHeight = (from.y < to.y) ? to.y : from.y;
        rpc.resizeiFrame(tWidth, tHeight, true, function() {
          var toDo = [
            function(callback) {
              minimize(from, function() {
                from.detach();
                if (afterMinimize) afterMinimize();
                callback();
              });
            }, function(callback) {
              expand(to, function() {
                if (afterExpand) afterExpand();
                callback();
              });
            }
          ];
          doThese(toDo, function() {
            rpc.resizeiFrame(to.x, to.y, true);
          });
        });
      });
    }
    function minimize (element, afterMinimize) {
      var aM = function () {
        if (afterMinimize) afterMinimize();
      };
      if(hasTransitions) {
        element
          .removeClass('active')
          .bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            aM();
            $(this).unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
      } else {
        element.animate({'left': -element.x}, 400, aM);
      }
    }
    function doThese (funcs, callback) {
      // this function takes an array of asynchronous functions with callbacks and executes the callback when they are all complete
      var counter = 0;
      $.each(funcs, function (index, func) {
        func(check);
      });
      function check() {
        counter++;
        if (counter === $(funcs).size()) {
          callback();
        }
      }
    }

  });
}