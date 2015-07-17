var TEST_MODULE = function(self){
  
  var tm = {};
  tm.scream = function(){
    alert('aaa!!');
  }
  tm.testThis = function(){
    console.log('what is this?');
    console.log(self);
  }
  return tm;
}

