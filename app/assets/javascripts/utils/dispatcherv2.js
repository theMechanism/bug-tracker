function DispatcherV2(validActions){
  this._validActions = validActions || {};
  this._listeners = [];
}

DispatcherV2.prototype = {
  register: function(listener){
    this._listeners.push(listener);
  },
  notify: function(ACTION, data){
    var action = this._validActions[ACTION];
    for (var i = 0; i < this._listeners.length; i++){
      if (this._listeners[i][action]){
        this._listeners[i][action](data);
      }
    }
  }
};