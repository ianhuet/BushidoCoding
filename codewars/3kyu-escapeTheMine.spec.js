'use strict'

const escape = require('./3kyu-escapeTheMine');
let Test = require('./lib/test-framework');
let _t = Test.Test;


_t.describe('A trivial map (1x1)', function() {
    var map = [[true]];
    
    _t.it('Should return an empty array, since we\'re already at the goal', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:0,y:0}), []);
    });
});

_t.describe('A pretty simple map (2x2)', function() {
    var map = [[true, false], [true, true]];

    _t.it('Should return the only correct move', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:1,y:0}), ['right']);
    });
    
    _t.it('Should return the only moves necessary', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:1,y:1}), ['right', 'down']);
    });
});

_t.describe('A linear map(1x4)', function() {
    var map = [[true], [true], [true], [true]];
    
    _t.it('Should return a chain of moves to the right', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:3,y:0}), ['right', 'right', 'right']);
    });
    
    _t.it('Should return a chain of moves to the left', function() {
       _t.assertSimilar(escape.solve(map, {x:3,y:0}, {x:0,y:0}), ['left', 'left', 'left']);
    });
});

_t.describe('Should walk around an obstacle (3x3 map)', function() {
    var map = [
        [true, true, true],
        [false, false, true],
        [true, true, true]
    ];
    
    _t.it('Should return the right sequence of moves', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:2,y:0}), ['down', 'down', 'right', 'right', 'up', 'up']);
    });
});

_t.describe('Should be able to change directions multiple times (5x5 map)', function() {
    var map = [
        [true, true, false, false, false],
        [false, true, true, false, false],
        [false, false, true, true, false],
        [false, false, false, true, true],
        [false, false, false, false, true]
    ];
      
    _t.it('Should return a step sequence of moves', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:4,y:4}),
            ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']);
    });
});

_t.describe('Should avoid dead-ends (5x5 map)', function() {
    var map = [
        [true, true, true, false, true],
        [false, false, true, false, true],
        [true, true, true, true, true],
        [true, false, true, false, false],
        [false, true, true, true, true]
    ];
    
    _t.it('Should return the right moves', function() {
        _t.assertSimilar(escape.solve(map, {x:0,y:0}, {x:4,y:4}), ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down'])
    });
});