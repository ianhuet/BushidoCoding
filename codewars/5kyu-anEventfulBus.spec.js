
function rInt(from, to) {
  if (!to) { to = from; from = 0; }
  return Math.floor(Math.random() * (to - from)) + from;
}

Array.prototype.random = function () {
  return this[rInt(this.length)];
}

function Route(count) {
  var parts = this.parts, stations = [], i, station;

  for (i = 0; i < count; i++) {
    station = parts[0].random() + parts[1].random();
    if (stations.indexOf(station) === -1) {
      stations.push(station);
    } else {
      i--;
    }
  }
  this.stations = stations;
  this.current = null;
  this.index = -1;
}

Route.prototype.parts = [
  ['Hairy', 'Spooky', 'Yellow', 'Farmer', 'Ruby', 'Green', 'Smelly', 'Stone', 'Silly', 'Owl'],
  [' Hills', 'sville', 'ston', 'sborough', ' Valley', 'fields', 'bears']
];

Route.prototype.next = function () {
  this.index++;
  return this.current = this.index < this.stations.length ? this.stations[this.index] : '';
}

function Passenger(route) {
  var names = this.names;

  this.name = names[0][rInt(names[0].length)] + ' ' + names[1][rInt(names[1].length)];
  this.destination = route.stations.random();
  this.route = route;
  this.boarded = false;
}

Passenger.prototype.names = [
  ['Alex', 'Boris', 'Richard', 'Robert', 'George', 'Sam', 'Ann', 'Mary', 'Kate', 'Susan', 'Jennifer', 'Lucy'],
  ['Smith', 'Sommers', 'Green', 'Thompson', 'Johnson', 'Simpson', 'White', 'Campbell', 'McDougal', 'Richards', 'Patisson', 'Williams']
];

Passenger.prototype.hopOn = function(bus) {
  this.boarded = true;
  bus.subscribe(this.destination, this.hopOff.bind(this));
}

Passenger.prototype.hopOff = function(time) {
  if (!this.boarded) {
    Test.expect(false, this.name + ' is already off the bus, and so someone else was erroneously alerted instead');
  }

  Test.expect(arguments.length > 0, '.emit is expected to pass parameters to a callback');

  Test.assertEquals(this.destination, this.route.current,
    this.name + ' expected to arrive at ' + this.destination + ', and instead was dropped off at' + this.route.current);

  this.boarded = false;
  log(this.name + ' has successfully arrived at ' + this.destination + ' at ' + time);
}

function Simulation(nStations, nPassengers) {
  var route = new Route(nStations), passengers = [];
  while(nPassengers--) {
    passengers.push(new Passenger(route));
  }

  this.route = route;
  this.passengers = passengers;
}

function log(message) {
  console.log('<span style="margin-left: 2em"><strong>' + message + '</strong></span>');
}
function announce(message) {
  console.log('<span style="color:#D0D000;"><strong>&gt;&nbsp;&nbsp;' + message + '</strong></span>');
}

Simulation.prototype.run = function run(bus) {
  var route = this.route,
      nStations = route.stations.length,
      start = 21 * 60, end = (24 + 8) * 60, 
      interval = Math.floor((end - start) / (nStations || 1)), 
      times = [], 
      time, hh, mm, i, curPassengers;

  for (i = 0; i < nStations; i++) {
    time = (start + interval * i + rInt(interval)) % (24 * 60);
    mm = time % 60;
    hh = Math.floor(time / 60);
    times.push(hh + ':' + (mm < 10 ? ('0' + mm) : mm));
  }

  announce('You can get aboard the bus now');
  this.passengers.forEach(function (passenger) {
    passenger.hopOn(bus);
  });
  announce('Boarding is now finished. Departing from the boarding point');

  for (i = 0, route.next(); i < nStations; i++, route.next()) {
    announce('Now arriving at ' + route.current);
    bus.emit(route.current, times[i]);

    curPassengers = this.passengers.filter(function (p) { 
      return p.destination === route.current;
    });
    bus.unsubscribe(route.current);

    if (i !== nStations - 1) {
      announce('Now departing from ' + route.current);
    }

    curPassengers.filter(function (p) { 
      return p.boarded;
    }).forEach(function (p) {
      Test.expect(false, p.name + ' was going to get off at ' + route.current + ' but is still on the bus!');
    });
  }

  announce('The trip is now over. Going to the depot for daily maintenance.');
  this.passengers
    .filter(function(p) { return p.boarded; })
    .forEach(function (p) {
      Test.expect(false, p.name + ' did not get off anywhere, and is still on the bus!');
    });

  announce('All passengers have successfully arrived at their destinations. Well done!');
}

function Stub() {
  var _stub = function () {
    _stub.calls += 1;
    _stub.args = Array.prototype.slice.call(arguments);
  }
  _stub.calls = 0;

  return _stub;
}


describe('the bus object', function () {

  var stubs = [], s0 = [], s1 = [], sCount = 6,
      e0 = 'test0', e1 = 'test1', 
      bus, j;

  for (j = 0; j < sCount; j++) {
    stubs[j] = new Stub();
  }

  stubs.forEach(function (stub, index) { 
    (!(index % 2) ? s0 : s1).push(stub); 
  });

  before(function () {
    bus = new Bus();
    
    stubs.forEach(function (stub) {
      stub.calls = 0;
      delete stub.args;
    });
  
  });

  it('has .subscribe, .unsubscribe and .emit methods', function () {
    ['subscribe', 'unsubscribe', 'emit'].forEach(function (method, i) {
      Test.expect(typeof bus[method] === 'function', 'should have '+ (i > 0 ? 'an': 'a') + ' .' + method + ' method');
    });
  });

  it('correctly handles .emit for a name with no callbacks', function () {
    
    try {
      bus.emit(e0);
      Test.expect(true);
    } catch (e) {
      Test.expect(false, 'error when executing emit for a name with no callbacks: ' + (e.message || e));
    }
  });

  it('can subscribe callbacks to a name and then invoke them by an .emit(name) call', function () {

    s0.forEach(function (stub) { bus.subscribe(e0, stub); });
    s1.forEach(function (stub) { bus.subscribe(e1, stub); });
      
    bus.emit(e0);
      
    s0.forEach(function (stub) {
      Test.expect(stub.calls === 1, 'unable to call a subscribed callback via .emit(name) with no additional arguments');
    });
  });

  it('.emit function executes only the callbacks for a provided name, and passes its additional arguments to them', function () {
    var args = ['foo', 1, function bar() { }, undefined, true, { foo: 'bar' }, null];
    
    s0.forEach(function (stub) { bus.subscribe(e0, stub); });
    s1.forEach(function (stub) { bus.subscribe(e1, stub); });
  
    bus.emit.apply(bus, [e1].concat(args));
      
    s1.forEach(function (stub) {
      Test.assertSimilar(stub.args, args, 'the callback should be called with correct arguments');
    });
      
    s0.forEach(function (stub) {
      Test.expect(stub.calls === 0, 'the callbacks for other names should not be called');
    });
  });

  it('can unsubscribe callbacks by event name and a function or just by event name', function () {

    s0.forEach(function (stub) { bus.subscribe(e0, stub); });
    s1.forEach(function (stub) { bus.subscribe(e0, stub); });
    
    bus.emit(e0);
    
    stubs.forEach(function (stub) {
      Test.expect(stub.calls === 1, 'unable to call a subscribed callback before its unsubscription');
    });
    
    s0.forEach(function (stub) {
      bus.unsubscribe(e0, stub);
    });
    
    bus.emit(e0);
    
    s0.forEach(function (stub) {
      Test.expect(stub.calls === 1, 'the callback is still invoked after being unsubscribed');
      stub.calls = 0;
    });
    s1.forEach(function (stub) {
      Test.expect(stub.calls === 2, 'after bus.unsubscribe(name, callback), the callback which hasn\'t been unsubscribed did not fire on .emit(name)');
      stub.calls = 0;
    });
    
    bus.unsubscribe(e0);
    bus.emit(e0);

    s0.forEach(function (stub) {
      Test.expect(stub.calls === 0, 'after bus.unsubscribe(name), no callbacks should fire on .emit(name)');
    });
  });

  it('passes the simulation test', function () {
      new Simulation(rInt(8, 16), rInt(25, 50)).run(bus);
  });

});
