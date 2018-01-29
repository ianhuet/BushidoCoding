'use strict'

const escape = require('./3kyu-escapeTheMine');
let Test = require('./lib/test-framework');
let _t = Test.Test;


Test.describe('A trivial map (1x1)', function() {
    var map = [[true]];
    
    Test.it('Should return an empty array, since we\'re already at the goal', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:0,y:0}), []);
    });
  });
  
  Test.describe('A pretty simple map (2x2)', function() {
    var map = [[true, false],
      [true, true]];
     
    Test.it('Should return the only correct move', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:0}), ['right']);
    });
    
    Test.it('Should return the only moves necessary', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:1}), ['right', 'down']);
    });
  });
  
  Test.describe('A linear map(1x4)', function() {
    var map = [[true], [true], [true], [true]];
    
    Test.it('Should return a chain of moves to the right', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:3,y:0}), ['right', 'right', 'right']);
    });
    
    Test.it('Should return a chain of moves to the left', function() {
       Test.assertSimilar(solve(map, {x:3,y:0}, {x:0,y:0}), ['left', 'left', 'left']);
    });
  });
  
  Test.describe('Should walk around an obstacle (3x3 map)', function() {
    var map = [[true, true, true],
    [false, false, true],
    [true, true, true]];
    
    Test.it('Should return the right sequence of moves', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:2,y:0}), ['down', 'down', 'right', 'right', 'up', 'up']);
    });
  });
  
  Test.describe('Should be able to change directions multiple times (5x5 map)', function() {
    var map = [[true, true, false, false, false],
      [false, true, true, false, false],
      [false, false, true, true, false],
      [false, false, false, true, true],
      [false, false, false, false, true]];
      
      Test.it('Should return a step sequence of moves', function() {
        Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}),
          ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']);
      });
  });
  
  Test.describe('Should avoid dead-ends (5x5 map)', function() {
    var map = [[true, true, true, false, true],
      [false, false, true, false, true],
      [true, true, true, true, true],
      [true, false, true, false, false],
      [false, true, true, true, true]];
    
    Test.it('Should return the right moves', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}), ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down'])
    });
  });