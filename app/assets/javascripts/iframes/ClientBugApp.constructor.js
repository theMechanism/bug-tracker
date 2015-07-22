var ClientBugApp = function(crossDomRPC){
  
  this._Dispatcher = new DispatcherV2(ClientBugAppValidActions);

  // easyXDM library -- a bit tricky, see DevNotes folder 
  this.crossDomRPC = crossDomRPC;

  // is there any reason for cookies? 
  this.cookieMonster = {
    setName: function(name) {
      $.cookie('mechBugTracker', name);
    },
    retrieveName: function() {
      return $.cookie('mechBugTracker');
    }
  };

  this.state = {};
  this.eventHandlers = ClientBugEventHandlers(this);
  this.services = ClientBugAppServices(this._Dispatcher); 
  this.domHooks = ClientBugAppDomHooks(this._Dispatcher, this.crossDomRPC);

  this._Dispatcher.register(this);
  this.init();
}

ClientBugApp.prototype = {
  init: function(){
    this.services.cacheSourceUrls(this.crossDomRPC);
  },
  buildContent: function(html){ 
    this.domHooks.getDomNodes(html);
  },
  getInitialState: function(){
    this.setState({
      expanded: false,
      selected_menu_option: '#form'
    });
  },
  stateChanged: function(newState){
    console.log(newState);
  },
  setState: function(newState){
    var self = this;
    var keys = Object.getOwnPropertyNames(newState);
    $.each(keys, function(i, key){
      var isChange = ( self.state[key] !== newState[key] );
      if (isChange){
        self.state[key] = newState[key];
        self._Dispatcher.notify('STATE_CHANGED', self.state)
      }    
    });
  },
  addListeners: function(){
    var $nodes = this.domHooks.handoffNodesForListeners();
    $nodes.pullTab.click(this.eventHandlers.showControlPanel);
    $nodes.closeButtons.click(this.eventHandlers.close);
    $nodes.menuSelects.click(this.eventHandlers.menuSelect);
    $nodes.form.submit( this.eventHandlers.bugSubmit);
    this.getInitialState();
  }
}