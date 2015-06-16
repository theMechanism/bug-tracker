var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;

// perhaps define constants later
// var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('lodash');

console.log('here in a modal store');

var _showing = false;
var _current_key = '';
// var _content_urls = {}
var _content_blocks = {};

function toggleShowing(){
  _showing = !_showing;
}

function setCurrentKey(currentKey){
  _current_key = currentKey;
}

// function setContentBlocks

var ModalStore = _.extend({}, EventEmitter.prototype, {

  getShowing: function(){
    return _showing;
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

}

});

module.exports = CartStore;