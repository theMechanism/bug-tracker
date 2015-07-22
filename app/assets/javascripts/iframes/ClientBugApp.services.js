var ClientBugAppServices = function(App) {
  var services = {};
  var sourceUrls = {};

  services.testHtml = function(html){
    console.log(html);
  };
  services.testUrls = function(){
    console.log(sourceUrls);
  };

  services.cacheSourceUrls = function(){
    App.crossDomRPC.customIframeContent(function(customIframeContent){
      sourceUrls = customIframeContent;
      // Todos, pass the retrieved info to a Dispatcher
      App.createAndAppendStyle(sourceUrls.iframe_base_style);
      services.getHtml();
    });
  };

  services.getHtml = function(){
    $.get(sourceUrls.url, function(res){
      App.buildContent(res.html);
    })
  };

  services.postBugToServer = function(submitFields){
    var url = App.$domNodes.controlPanel.form.attr('action');
    $.post(url, submitFields).done(function(res){
      if (res.id){
        App.eventHandlers.successfulBug(res);
      } else {
        App.eventHandlers.bugErrors(res);
      }
    });
  };
  services.updateBugList = function(){
    $.get(sourceUrls.updated_bugs_table, function(res){
      App.$domNodes.controlPanel.bugsTable = res.html;
    });
  }


  return services;
}