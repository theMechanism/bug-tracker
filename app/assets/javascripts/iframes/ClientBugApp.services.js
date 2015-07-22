var ClientBugAppServices = function(_Dispatcher) {

  var services = {};
  var sourceUrls = {};

  _Dispatcher.register(services);

  services.cacheSourceUrls = function(xdmRpc){
    xdmRpc.customIframeContent(function(customIframeContent){
      sourceUrls = customIframeContent;
      _Dispatcher.notify('CREATE_AND_APPEND_STYLE', sourceUrls.iframe_base_style);
      services.getHtml();
    });
  };

  services.getHtml = function(){
    $.get(sourceUrls.url, function(res){
      _Dispatcher.notify('BUILD_CONTENT', res.html);
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