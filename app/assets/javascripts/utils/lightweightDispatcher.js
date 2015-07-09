function Dispatcher(validActions) {
    this._listeners = [];
    this._validActions = validActions || {};
}

Dispatcher.prototype = {
    register : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (action, data) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            if (this._listeners[index][action]){
                this._listeners[index][action](data);
            } 
        }
    }
};