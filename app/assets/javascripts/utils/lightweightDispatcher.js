function Dispatcher() {
    this._listeners = [];
}

Dispatcher.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (action, data) {
        var index;

        _.each(this._listeners, function(listener){
            listener[action](data);
        });
    }
};