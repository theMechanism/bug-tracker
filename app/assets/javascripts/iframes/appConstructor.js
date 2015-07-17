var ClientBugApp = function(crossDomRPC, html){
  this.$mountNode = $('#mech-bug-tracker');
  this.$domNodes = {};
  // this.views = [this.$domNodes.mechBugReport, this.$domNodes.mechBugResponse, this.$domNodes.mechBugError, this.$domNodes.mechPullTab];

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
  this.testModule = TEST_MODULE(this);
  this.resizingFunctions = resizingFunctions(this);
  this.eventHandlers = ClientBugEventHandlers(this);
  this.init(html);
}

ClientBugApp.prototype = {
  init: function(html){
    var self = this;
    
    this.$mountNode.css({'visibility': 'hidden'});
    this.$mountNode.append(html);
    this.$domNodes = getDomNodes(this.$mountNode);
    
    var pullTab = this.$domNodes.mechPullTab;
    pullTab.x = 180;
    var views = [pullTab, self.$domNodes.controlPanel.parent];
    
    this.crossDomRPC.resizeiFrame(1000, 1000, false, function() {
      self.resizingFunctions.getDimensions(views, function() {
        // console.log('check the views: ' + views);
        $.each(views, function (index, element) {
          element.detach().css({'visibility': 'visible'});
        });

        self.$mountNode.append(pullTab);
        
        self.crossDomRPC.resizeiFrame(pullTab.x, pullTab.y, false, function() {
          self.resizingFunctions.expand(pullTab);
          self.addListeners();
        });
      });
    });
  },
  setState: function(obj){
    var key = Object.getOwnPropertyNames(obj)[0];
    this.state[key] = obj[key];
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
    // this.$domNodes.controlPanel.form.submit(ClientBugEventHandlers.handleSubmit);
    // this.$domNodes.mechBugSubmit.click(ClientBugEventHandlers.handleSubmit);
  }
}