$(document).ready(function () {
  var validActions = {
    CHANGE_DISPLAYED_ELEMENT: 'changeDisplayedElement',
    HANDLE_SUBMIT: 'handleSubmit'
  };

  // var 
  iframeDispatcher = new Dispatcher(validActions);

  if (mechBugInit) {
    console.log('mechBugInit exists in global namespace');
  }


});