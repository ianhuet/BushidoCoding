
IanHuet - v.1
=========================================

function Bus() {
  var api = {};
  var queue = [];

  api.subscribe = function(name, callback) {
    if(! queue.hasOwnProperty(name)) {
      queue[name] = [];
    }
    queue[name].push(callback);
  }
  api.unsubscribe = function(name, callback) {
    if(typeof callback === "undefined" || callback === null) {
      delete queue[name];
    } else {
      var d = queue[name];
      var i = d.indexOf(callback);
      d.splice(i, 1);
    }
  }
  api.emit = function() {
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift();

    if(queue.hasOwnProperty(name)) {
      for(var x=0; x<queue[name].length; x++) {
        queue[name][x].apply(this, args);
      }
    } else {
      return 0;
    }
  }

  return api;
};



IanHuet v.2
=========================================

function Bus() {
  var api = {};
  var stations = [];

  api.subscribe = function(name, callback) {
    stations[name] = [cb].concat(stations[name] || []);
  }
  api.unsubscribe = function(name, callback) {
    if (callback && stations.has(name)) {
      stations.get(name).delete(callback);
    } else {
      stations.delete(name);
    }
  }
  api.emit = function() {
    var args = Array.prototype.slice.call(arguments).slice(1);
    (this.stations[name] || []).forEach(function(cb){
      cb.apply(this, args);
    });
  }

  return api;
};
