// the rpc functions are all defined in 
// views/iframes/load_script.js.erb
// the three empty objects are stubs for the methods defined + queried from within the client's browser



var returnedHtml;
// $.getScript(customIframeContent.iframe_js);
$(document).ready(function(){
  console.log(rpc);

  var rpc = new easyXDM.Rpc({},
  {
    remote: {
      resizeiFrame: {},
      parentInfo: {},
      customIframeContent: {}
    }
  });

  rpc.customIframeContent(function(customIframeContent){
    console.log('via customIframeContent => ' + customIframeContent.url);
    console.log('passing js? => ' + customIframeContent.iframe_js);
    // $.get(customIframeContent.url, function(r){
    //   console.log(r);
    $.getScript(customIframeContent.iframe_js);
    // });
    $.get(customIframeContent.url,function(r){
      returnedHtml = r;
      $('body').append(r);
      mechBugInit();
    });
  });

});