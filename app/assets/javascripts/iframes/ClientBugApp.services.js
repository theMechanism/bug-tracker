var ClientBugAppServices = function(App) {
  var services = {};
  var sourceUrls = {};

  services.testHtml = function(html){
    console.log(html);
  };

  services.cacheSourceUrls = function(){
    App.crossDomRPC.customIframeContent(function(customIframeContent){
      sourceUrls = customIframeContent;
      App.createAndAppendStyle(sourceUrls.iframe_base_style);
      services.getHtml();
    });
  }

  services.getHtml = function(){
    var html;
    $.get(sourceUrls.url, function(res){
      // services.testHtml(res.html);
      App.buildContent(res.html);
    })
    // return html;
  }

  return services;
}