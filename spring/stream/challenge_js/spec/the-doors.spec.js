var challenge = require('../the-doors');
var assert = require('assert');

function isArray (value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

function isValidDoorState (doors) {
  var invalidDoors = doors.filter(n => n !== 0 && n !== 1);
  return invalidDoors.length == 0;
}


describe('The Doors - initDoors', function(){

  var min=0, max=0, noDoors=0, result;


  // Test #1 - Red / Green / Refactor
  it('should return value',function(){
    noDoors = 5;
    result = challenge.initDoors(noDoors);

    assert.notEqual(result, undefined);
  })

  // Test #2 - Red / Green / Refactor
  it('should handle `n` No. doors (n < 1)',function(){
    min = -20;
    max = 0;
    noDoors = Math.floor(Math.random() * (max - min + 1)) + min;
    result = challenge.initDoors(noDoors);

    assert.equal(result, false);
  })

  // Test #3 - Red / Green / Refactor
  it('should return Array for `n` no. doors (1 <= n <= 101)',function(){
    min = 1;
    max = 101;
    noDoors = Math.floor(Math.random() * (max - min + 1)) + min;
    result = challenge.initDoors(noDoors);

    assert.equal(isArray (result), true);
  })

  // Test #4 - Red / Green / Refactor
  it('should return Array of values 0 or 1',function(){
    min = 1;
    max = 101;
    noDoors = Math.floor(Math.random() * (max - min + 1)) + min;
    result = challenge.initDoors(noDoors);

    assert.equal(isValidDoorState (result), true);
  })

})
