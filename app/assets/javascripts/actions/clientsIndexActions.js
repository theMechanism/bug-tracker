console.log('aloha from clientsIndexActions.js, check on AppDispatcher');
var AppDispatcher = require('../AppDispatcher');

var ClientsIndexActions = {

  // show modal clicked, with specific data, client id or other clue for display data

  toggleModal: function(data){
    AppDispatcher.handleAction({
      actionType: 'TOGGLE_MODAL',
      data: data
    });
  }

};

module.exports = ClientsIndexActions;