console.log('in modal store');
var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;

// perhaps define constants later
// var FluxCartConstants = require('../constants/FluxCartConstants');

console.log('here in a modal store');

var _showing = false;
var _current_key = '';
// var _content_urls = {}
var _content_blocks = {};

function toggleShowing(){
  _showing = !_showing;
}

function setContentKey(currentKey){
  _current_key = currentKey;
}

// for getting html from rails--- an anti pattern for react 
// but too useful to default to simple_forms
// also -- does this belong in store, or somewhere else? 

function getContentBlocks(content_urls){
  var self = this;
  var content_keys = _.keys(content_urls);
  
  _.each(content_keys, function(key){ 
    $.get(content_urls[key], function(block){
      _content_blocks[key] = block;
    });
  });  

}


var ModalStore = _.extend({}, EventEmitter.prototype, {

  getKeys: function(){
    return _.keys(content_blocks);
  },
  getShowing: function(){
    return _showing;
  }, 
  getContentKey: function(){
    return _current_key;
  },
  setContentKey: function(currentKey){
    setContentKey(currentKey);
  },
  getCurrentContent: function(){
    return _content_blocks[_current_key];
  }, 
  getContentBlocks: function(content_urls){
    getContentBlocks(content_urls);
  },
  toggleShowing: function(){
    _showing = !_showing;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});



AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to CART_ADD action
    case 'TOGGLE_MODAL':
      console.log(action.data.content_key);
      setContentKey(action.data.content_key)
//       setCurrentKey(data);
// client_id
      break;


    default:
      return true;
  }

  // If action was responded to, emit change event
  ModalStore.emitChange();

  return true;

});



module.exports = ModalStore;