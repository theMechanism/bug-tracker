// the rpc functions are all defined in 
// views/iframes/load_script.js.erb
// the three empty objects are stubs for the methods defined + queried from within the client's browser


var App;
// try {
  $(document).ready(function(){

    rpc = new easyXDM.Rpc({},
    {
      remote: {
        resizeiFrame: {},
        parentInfo: {},
        customIframeContent: {}
      }
    });

    rpc.customIframeContent(function(customIframeContent){
      $.getScript(customIframeContent.iframe_js, function(){
        $.getJSON(customIframeContent.url,function(r){
          App = new ClientBugApp(rpc, r.html);
        })
      });
        
    });

  });
//   throw new Error('oops');
// } catch (e) {
//   TraceKit.report(e); //error with stack trace gets normalized and sent to subscriber
// }
