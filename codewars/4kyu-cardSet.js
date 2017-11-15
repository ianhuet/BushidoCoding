'use strict';

// let cards = [
//   [[3,1,1,1],[3,1,1,2],[3,1,1,3]],
//   [[2,2,1,1],[1,2,2,2],[1,2,2,3]],
//   [[1,1,1,1],[1,2,1,2],[1,1,1,3]],
//   [[2,1,1,1],[2,2,2,2],[2,1,1,3]]
// ];


/*
let cards = [
  [[1,1,1,1],[1,2,1,2],[1,1,1,3]],
  [[2,1,1,1],[2,2,2,2],[2,1,1,3]],
  [[3,1,1,1],[3,1,1,2],[3,1,1,3]],
  [[2,2,1,1],[1,2,2,2],[1,2,2,3]]
];

// Expected: 2, instead got: 5
// [[0,0],[1,0],[2,0]]
// [[0,0],[1,2],[2,1]]
// [[0,2],[1,0],[2,1]]
// [[0,2],[1,2],[2,2]]
// [[2,0],[2,1],[2,2]]
*/


let cards = [
  [[2,2,2,2],[2,1,1,3],[2,1,1,1]],
  [[3,1,1,2],[3,1,1,3],[3,1,1,1]],
  [[1,2,2,2],[1,2,2,3],[2,2,1,1]],
  [[1,1,1,1],[1,2,1,2],[1,1,1,3]]
];

// Expected: 2, instead got: 1
// [[[0,1],[1,0],[3,0]]]



function getSolutions(cards) {
  const flattenDeck = (c) => c.reduce((a,b) => a.concat(b));
  const pruneSets   = (s) => Array.from(new Set(s));

  // const convertTo2D = (s) => s.map((n) => deckPos(line[parseInt(n)]));
  function convertTo2D(s) {
    return s.map(function(n){
      n = Array.from(n);
      return n.map(function(m){
        return deckPos(line[m]);
      });
    });
  }

  const deckPos = (card) => {
    for(var x=0; x<cards.length; x++){
      for(var y=0; y<cards[0].length; y++){
        if(cards[x][y] === card) return [x,y];
    } }
    return false;
  };

  const checkCards = (t, c1, c2, c3) => {
    if ((c1[t] === c2[t]) && (c2[t] === c3[t]) && (c1[t] === c3[t])) return true
    if ((c1[t] !== c2[t]) && (c2[t] !== c3[t]) && (c1[t] !== c3[t])) return true;
    return false;
  }

  const findAllSets = () => {
    let cardL=12, set;

    for (var x=0; x<cardL; x++) {
      for (var y=0; y<cardL; y++) {
        for (var z=0; z<cardL; z++) {
          if(x!==y && y!==z && x!==z) {
            if(
              checkCards(0, line[x], line[y], line[z]) &&
              checkCards(1, line[x], line[y], line[z]) &&
              checkCards(2, line[x], line[y], line[z]) &&
              checkCards(3, line[x], line[y], line[z])
            ){
              set = [x,y,z].sort((a,b) => a-b).join('-');
              sets.push(set);
    } } } } }
  }

  function countMultiUse(s) {
    let count={};
    s.forEach(s=>count[s]=(count[s]||0)+1);
    return count;
  }

  function getMostUsed(c) {
    return Object.keys(c).reduce((a,b) => c[a] > c[b] ? a : b);
  }

  function findOverlap(s1,s2) {
    let overlap = new Set();
    s1.forEach(e => { if(s2.has(e)) overlap.add(e) });
    return overlap.size;
  }

  function removeMultiUse(s) {
    let s0=[], i;

    s = s.map(s => s.split('-')).map(n => new Set(n));
    s0.push(s[0]);

    i = s.length-1;
    while (i-- && i>0) {
      if(! findOverlap(s[0],s[i])) s0.push(s[i]);
    }
    return s0;
  }



  let sets=[];
  let line = flattenDeck(cards);

  findAllSets();
  sets = pruneSets(sets);
  sets = removeMultiUse(sets);
  sets = convertTo2D(sets);

  console.log(cards);
  console.log(sets);
  return sets;
}


// console.log('Sets', JSON.stringify(getSolutions(cards),true));
getSolutions(cards);

