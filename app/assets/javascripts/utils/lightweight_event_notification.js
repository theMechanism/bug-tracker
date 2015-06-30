function Event() {
    // this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (action) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index][action]();
        }
    }
};