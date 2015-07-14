var rpc = new easyXDM.Rpc({},
{
  remote: {
    resizeiFrame: {},
    parentInfo: {},
    getMyContent: {}
  }
});

$(document).ready(function(){
  console.log(rpc);
  rpc.parentInfo(function(parentInfo){console.log(parentInfo.custom_iframe_path)})
});