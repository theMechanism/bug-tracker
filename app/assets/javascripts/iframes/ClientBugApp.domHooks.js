var ClientBugAppDomHooks = function(_Dispatcher, xdmRpc) {

  
  var $mountNode = $('#mech-bug-tracker');
  var $head = $('head');

  var hasTransitions = (Modernizr.csstransforms && Modernizr.csstransitions);
  var resizingFuncs = ClientBugAppResizingFunctions(xdmRpc, hasTransitions, $mountNode);

  var $nodes = {};
  var funcs = {}; 
  var domState = {
    expanded: undefined
  };
  _Dispatcher.register(funcs);
  

  funcs.stateChanged = function(newState){
    switch(newState.expanded){
      case true:
        if (newState.expanded !== domState.expanded){
          console.log('the expand must show')
        }
        break;
      case false:
        if (newState.expanded !== domState.expanded){
          console.log('the expand must hide')
        }
        break;
    }
  };
  funcs.getDomNodes = function(html){
    $mountNode.css({'visibility': 'hidden'});
    $mountNode.append(html);
    
    $nodes = {
      mount: $mountNode,
      pullTab: $('#mech-pull-tab'),

      controlPanel: {
        parent: $('#mech-bug-report'),
        menu: {
          selects: $('.menu_select a')
        },
        selected_content: $('#selected_content'),
        form: $('form#new_bug'),
        bugName: $('#bug_name'),
        bugDesc: $('#bug_description'),
        formSubmitButton: $('form a[href="#submit"]'),
        bugsTable: $('#bugsTable'),
        links: $('#links')
      },
      feedback: {
        response: $('#mech-bug-response'),
        error: $('#mech-bug-error'),
        errorInfo: $('#mech-bug-error-info')
      },
      wraps: $('.mech-bug-wrap', $mountNode),
      closeButtons: $('.mech-bug-close')
    };
    funcs.buildFirstScene();
  };
  funcs.createAndAppendStyle = function(href){
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = href;
    $head.append(style);
  };
  funcs.buildFirstScene = function(){
    $nodes.pullTab.x = 180;
    var views = [$nodes.pullTab, $nodes.controlPanel.parent, $nodes.feedback.error, $nodes.feedback.response];
    
    xdmRpc.resizeiFrame(1000, 1000, false, function() {
      resizingFuncs.getDimensions(views, function() {
        $.each(views, function (index, element) {
          element.detach().css({'visibility': 'visible'});
        });
        $mountNode.append($nodes.pullTab);
        
        xdmRpc.resizeiFrame($nodes.pullTab.x, $nodes.pullTab.y, false, function() {
          resizingFuncs.expand($nodes.pullTab);
        });
      });
    });
    _Dispatcher.notify('ADD_LISTENERS');
  };
  funcs.handoffNodesForListeners = function(){
    return {
      pullTab: $nodes.pullTab,
      closeButtons: $nodes.closeButtons,
      menuSelects: $nodes.controlPanel.menu.selects,
      form: $nodes.controlPanel.form
    };
  }

  return funcs;
}