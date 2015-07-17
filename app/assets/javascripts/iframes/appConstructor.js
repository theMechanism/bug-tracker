var ClientBugApp = function(crossDomRPC){
  this.$domNodes = getDomNodes();
  this.views = [this.$domNodes.mechBugReport, this.$domNodes.mechBugResponse, this.$domNodes.mechBugError, this.$domNodes.mechPullTab];

  this.crossDomRPC = crossDomRPC;

  this.cookieMonster = {
    setName: function(name) {
      $.cookie('mechBugTracker', name);
    },
    retrieveName: function() {
      return $.cookie('mechBugTracker');
    }
  };
}

ClientBugApp.prototype = {
  init: function(){

  },
  addListeners: function(){
    this.$domNodes.mechBugClose.click(ClientBugEventHandlers.handleClose);
    this.$domNodes.mechBugForm.submit(ClientBugEventHandlers.handleSubmit);
    this.$domNodes.mechBugSubmit.click(ClientBugEventHandlers.handleSubmit);
  }
}