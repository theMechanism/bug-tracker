var ClientBugApp = function(){
  this.$domNodes = getDomNodes();
  this.views = [this.$domNodes.mechBugReport, this.$domNodes.mechBugResponse, this.$domNodes.mechBugError, this.$domNodes.mechPullTab];

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
  addListeners: function(){
    this.$domNodes.mechBugClose.click(ClientBugEventHandlers.handleClose);
    this.$domNodes.mechBugForm.submit(ClientBugEventHandlers.handleSubmit);
    this.$domNodes.mechBugSubmit.click(ClientBugEventHandlers.handleSubmit);
  }
}