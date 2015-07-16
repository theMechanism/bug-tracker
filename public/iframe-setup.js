// the rpc functions are all defined in 
// views/iframes/load_script.js.erb
// the three empty objects are stubs until 

var rpc = new easyXDM.Rpc({},
{
  remote: {
    resizeiFrame: {},
    parentInfo: {},
    customIframeContent: {}
  }
});

$(document).ready(function(){
  console.log(rpc);
  rpc.parentInfo(function(parentInfo){console.log('via parentInfo func => ' + parentInfo.custom_iframe_path)})

  rpc.customIframeContent(function(customIframeContent){
    console.log('via customIframeContent => ' + customIframeContent.url);
  });



});