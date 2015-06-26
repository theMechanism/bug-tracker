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
  var client_id = event.currentTarget.id.match(/\d+/)[0];
  $('#project_client_id').val(client_id);
}