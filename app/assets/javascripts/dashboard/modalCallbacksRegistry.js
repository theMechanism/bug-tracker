var ModalCallbacks = {};

ModalCallbacks.registeredKeys = function(){
  return {
    'new_client_project': ModalCallbacks.selectClientFromDropDown
  }
}

ModalCallbacks.checkIfRegistered = function(modalKey) {
  var self = this;
  if ( self.registeredKeys()[modalKey] ){
    return self.registeredKeys()[modalKey];
  } else {
    return false;
  }
}

ModalCallbacks.selectClientFromDropDown = function(){
  console.log('jeez, just fired. eek!');
}