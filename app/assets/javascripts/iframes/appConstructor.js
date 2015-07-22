var ClientBugApp = function(crossDomRPC){
  
  // TODO -- no longer need to catch mountNode in separate DOM sweep -- can do with getDomNodes()

  this.$mountNode = $('#mech-bug-tracker');
  this.$domNodes = {};
  
  // easyXDM library -- a bit tricky, see DevNotes folder 
  this.crossDomRPC = crossDomRPC;
  this.sourceUrls = {};

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
  this.resizingFunctions = resizingFunctions(this);
  this.eventHandlers = ClientBugEventHandlers(this);
  this.services = {}; // this should be module for all ajax functions
  this.init();
}

ClientBugApp.prototype = {
  init: function(){
    this.cacheSourceUrls();
  },
  cacheSourceUrls: function(){
    var self = this;
    this.crossDomRPC.customIframeContent(function(customIframeContent){
      self.sourceUrls = customIframeContent;
      self.getHtml();
    });
  },
  getHtml: function(){
    var self = this;
    $.get(self.sourceUrls.url, function(res){
      self.html = res.html;
      self.buildContent();
    })
  },
  buildContent: function(){
    var self = this;
    var $head = $('head');
    // place holder, as i assume there may be an additional style to append
    this.createAndAppendStyle($head, this.sourceUrls.iframe_base_style);
    this.$mountNode.css({'visibility': 'hidden'});
    this.$mountNode.append(self.html);
    this.$domNodes = getDomNodes(this.$mountNode);
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
  createAndAppendStyle: function($head, href){
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
  }, 
  postToServer: function(submitFields){
    var self = this;
    var url = self.$domNodes.controlPanel.form.attr('action');
    $.post(url, submitFields).done(function(res){
      if (res.id){
        self.eventHandlers.successfulBug(res);
      } else {
        self.eventHandlers.bugErrors(res);
      }
    });
  },
  updateBugList: function(){
    var self = this;
    this.crossDomRPC.customIframeContent(function(customIframeContent){
      $.get(customIframeContent.updated_bugs_table, function(res){
        self.$domNodes.controlPanel.bugsTable = res.html;
      })
    });
  }
}