ClientBugAppResizingFunctions = function(xdmRpc, hasTransitions, $mountNode) {
  var funcs = {};
  funcs.minimize = function(element, afterMinimize) {
    var aM = function () {
      if (afterMinimize) afterMinimize();
    };
    if(hasTransitions) {
      element
        .removeClass('active')
        .bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          aM();
          // console.log('inside minimize, print this');
          // console.log(this);
          $(this).unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });
    } else {
      element.animate({'left': -element.x}, 400, aM);
    }
  };
  funcs.expand = function(element, afterExpand) {
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
  };
  funcs.getDimensions = function(elements, callback) {
    xdmRpc.parentInfo(function(data) {
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
  };
  funcs.fromTo =  function(from, to, afterMinimize, afterExpand) {
    $mountNode.append(to);
    funcs.getDimensions([from, to], function() {
      var tWidth = (from.x < to.x) ? to.x : from.x,
        tHeight = (from.y < to.y) ? to.y : from.y;
      xdmRpc.resizeiFrame(tWidth, tHeight, true, function() {
        var toDo = [
          function(callback) {
            funcs.minimize(from, function() {
              from.detach();
              if (afterMinimize) afterMinimize();
              callback();
            });
          }, function(callback) {
            funcs.expand(to, function() {
              if (afterExpand) afterExpand();
              callback();
            });
          }
        ];
        GlobalUtils.loadBefore(toDo, function() {
          xdmRpc.resizeiFrame(to.x, to.y, true);
        });
      });
    });
  }
  return funcs;
}


 
      