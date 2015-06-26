var ModalCallbacks = {};

ModalCallbacks.registeredKeys = function(){
  return {
    'new_client_project': ModalCallbacks.selectClientFromDropDown
  }
}

ModalCallbacks.checkIfRegistered = function(modalKey) {
  var self = this;
  if ( self.registeredKeys()[modalKey] ){
    return true;
  } else {
    return false;
  }
}

ModalCallbacks.selectClientFromDropDown = function(event){
  console.log('jeez, just fired. eek!');
  console.log(event);
}