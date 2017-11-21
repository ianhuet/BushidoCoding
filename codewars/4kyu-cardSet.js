'use strict';

function getSolutions(cards) {
  const flattenDeck = (c) => c.reduce((a,b) => a.concat(b));
  const pruneSets   = (s) => Array.from(new Set(s));
  const convertStrToSet = (s) => {
    s = s.map(s => s.split('-')).map(n => new Set(n));
    return s;
  };

  const convertTo2D = (s) => {
    return s.map((n) => {
      n = Array.from(n);
      return n.map((m) => deckPos(line[m]));
    });
  };

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
  };

  const findOverlap = (s1,s2) => {
    let overlap = new Set();
    s1.forEach(e => { if(s2.has(e)) overlap.add(e) });
    return overlap.size;
  };

  const inSet = (ss,s) => {
    let filtered = ss.filter(function(n){
      return findOverlap(n,s);
    });
    return filtered.length > 0;
  };


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
  };

  const findValidSets = (s) => {
    let s0=[], i=0, first=true;

    s.forEach(function(n){
      for(let x=i; x<s.length; x++) {
        if ((x!==i) && !findOverlap(s[i],s[x]) && ! inSet(s0,s[x])) {

          if(first) {
            s0.push(s[i]);
            first = false;
          }

          s0.push(s[x]);
        }
      } 
      i++;
    });
    return s0;
  };


  let sets=[];
  let line = flattenDeck(cards);

  findAllSets();
  sets = pruneSets(sets);
  sets = convertStrToSet(sets);
  sets = (sets.length > 1) ? findValidSets(sets) : sets;
  sets = convertTo2D(sets);

  return sets;
}


// console.log('Sets', JSON.stringify(getSolutions(cards),true));
getSolutions(cards);

