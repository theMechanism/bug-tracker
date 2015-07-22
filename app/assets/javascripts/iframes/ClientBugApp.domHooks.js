var ClientBugAppDomHooks = function(_Dispatcher, xdmRpc) {

  
  var $mountNode = $('#mech-bug-tracker');
  var $head = $('head');

  var hasTransitions = (Modernizr.csstransforms && Modernizr.csstransitions);
  var resizingFuncs = ClientBugAppResizingFunctions(xdmRpc, hasTransitions, $mountNode);

  var $nodes = {};
  var funcs = {}; 
  _Dispatcher.register(funcs);
  

  funcs.testNodes = function(){
    console.log($nodes);
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
    console.log('adding style');
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
    // this.setState({selected_menu_option: '#form'});
  };
  funcs.handoffNodesForListeners = function(){
    return {
      pullTab: $nodes.pullTab,
      closeButtons: $nodes.closeButtons,
      menuSelects: $nodes.menu.selects,
      form: $nodes.form
    };
    // var self = this;
    // this.$domNodes.mechPullTab.click(self.eventHandlers.showControlPanel);
    // this.$domNodes.closeButtons.click(self.eventHandlers.close);
    // this.$domNodes.controlPanel.menu.selects.click(self.eventHandlers.menuSelect);
    // this.$domNodes.controlPanel.form.submit( self.eventHandlers.bugSubmit);
  }

  return funcs;
}