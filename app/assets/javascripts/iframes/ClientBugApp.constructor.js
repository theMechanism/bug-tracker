var ClientBugApp = function(crossDomRPC){
  
  var _Dispatcher = new DispatcherV2(ClientBugAppValidActions);
  // TODO -- dispatcher need not by accessible
  this.dispatcher = _Dispatcher;

  // TODO -- no longer need to catch mountNode in separate DOM sweep -- can do with getDomNodes()

  // this.$mountNode = $('#mech-bug-tracker');
  // this.$domNodes = {};
  
  // easyXDM library -- a bit tricky, see DevNotes folder 
  this.crossDomRPC = crossDomRPC;

  this.cookieMonster = {
    setName: function(name) {
      $.cookie('mechBugTracker', name);
    },
    retrieveName: function() {
      return $.cookie('mechBugTracker');
    }
  };
  this.hasTransitions = (Modernizr.csstransforms && Modernizr.csstransitions);

  this.state = {
    expanded: false,
    selected_menu_option: ''
  };

  // initialize module functions, pass the App / 'this' context in for reference
  this.resizingFunctions = ClientBugAppResizingFunctions(this);
  this.eventHandlers = ClientBugEventHandlers(this);
  this.services = ClientBugAppServices(_Dispatcher); 
  this.domHooks = ClientBugAppDomHooks(_Dispatcher);

  _Dispatcher.register(this);
  this.init();
}

ClientBugApp.prototype = {
  init: function(){
    this.services.cacheSourceUrls(this.crossDomRPC);
  },
  buildContent: function(html){ 
    // this.$mountNode.css({'visibility': 'hidden'});
    // this.$mountNode.append(html);
    this.domHooks.getDomNodes();
    this.buildFirstScene();
    this.addListeners();
  },
  buildFirstScene: function(){
    var self = this;
    var pullTab = this.$domNodes.mechPullTab;
    pullTab.x = 180;
    var views = [pullTab, self.$domNodes.controlPanel.parent, self.$domNodes.feedback.error, self.$domNodes.feedback.response];
    
    this.crossDomRPC.resizeiFrame(1000, 1000, false, function() {
      self.resizingFunctions.getDimensions(views, function() {
        $.each(views, function (index, element) {
          element.detach().css({'visibility': 'visible'});
        });
        self.$mountNode.append(pullTab);
        
        self.crossDomRPC.resizeiFrame(pullTab.x, pullTab.y, false, function() {
          self.resizingFunctions.expand(pullTab);
        });
      });
    });
    this.setState({selected_menu_option: '#form'});
  },
  createAndAppendStyle: function(href){
    var $head = $('head');
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = href;
    $head.append(style);
  },
  setState: function(obj){
    var self = this;
    var key = Object.getOwnPropertyNames(obj)[0];
    var isChange = ( self.state[key] !== obj[key] );
    if (isChange){
      self.state[key] = obj[key];
      switch (key){
        case 'selected_menu_option':
          var nodeName = obj[key].match(/[a-zA-Z]+$/);
          self.$domNodes.controlPanel.selected_content.html(
            self.$domNodes.controlPanel[nodeName]);
          break;
        case 'expanded':
          break;
      }
    }    
  },
  remove: function(){
    var self = this;
    this.$mountNode.detach(self.components.pullTab);
  },
  addListeners: function(){
    var self = this;
    this.$domNodes.mechPullTab.click(self.eventHandlers.showControlPanel);
    this.$domNodes.closeButtons.click(self.eventHandlers.close);
    this.$domNodes.controlPanel.menu.selects.click(self.eventHandlers.menuSelect);
    this.$domNodes.controlPanel.form.submit( self.eventHandlers.bugSubmit);
  }
}