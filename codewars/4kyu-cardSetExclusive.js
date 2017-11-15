let cards = [
  [[3,1,1,1],[3,1,1,2],[3,1,1,3]],
  [[2,2,1,1],[1,2,2,2],[1,2,2,3]],
  [[1,1,1,1],[1,2,1,2],[1,1,1,3]],
  [[2,1,1,1],[2,2,2,2],[2,1,1,3]]
];



function getSolutions(cards) {
  const flattenDeck = (c) => c.reduce((a,b) => a.concat(b));
  const removeSet   = (c1,c2,c3) => pCards.filter(n => n!==c1 && n!==c2 && n!==c3);

  const deckPos = (card) => {
    for(var x=0; x<cards.length; x++){
      for(var y=0; y<cards[0].length; y++){
        if(cards[x][y] === card) return [x,y];
    } }
    return false;
  };

  const checkSet = (t, c1, c2, c3) => {
    if ((c1[t] === c2[t]) && (c2[t] === c3[t]) && (c1[t] === c3[t])) return true
    if ((c1[t] !== c2[t]) && (c2[t] !== c3[t]) && (c1[t] !== c3[t])) return true;
    return false;
  }

  const findSet = () => {
    let cardLen = pCards.length;
    for (var x=0; x<cardLen; x++) {
      for (var y=0; y<cardLen; y++) {
        for (var z=0; z<cardLen; z++) {
          if(x!==y && y!==z && x!==z) {
            if(
              checkSet(0, pCards[x], pCards[y], pCards[z]) &&
              checkSet(1, pCards[x], pCards[y], pCards[z]) &&
              checkSet(2, pCards[x], pCards[y], pCards[z]) &&
              checkSet(3, pCards[x], pCards[y], pCards[z])
            ){
              sets.push([deckPos(pCards[x]), deckPos(pCards[y]), deckPos(pCards[z])]);
              pCards = removeSet(pCards[x], pCards[y], pCards[z]);
              return true;
            }
          }
    } } }

    return false;
  }

  const findDownSet = () => {
    let cardLen = pCards.length-1;
    for (var x=cardLen; x>=0; x--) {
      for (var y=cardLen; y>=0; y--) {
        for (var z=cardLen; z>=0; z--) {
          if(x!==y && y!==z && x!==z) {
            if(
              checkSet(0, pCards[x], pCards[y], pCards[z]) &&
              checkSet(1, pCards[x], pCards[y], pCards[z]) &&
              checkSet(2, pCards[x], pCards[y], pCards[z]) &&
              checkSet(3, pCards[x], pCards[y], pCards[z])
            ){
              dSets.push([deckPos(pCards[x]), deckPos(pCards[y]), deckPos(pCards[z])]);
              pCards = removeSet(pCards[x], pCards[y], pCards[z]);
              return true;
            }
          }
    } } }

    return false;
  }



  // init
  let sets=[];
  let pCards = flattenDeck(cards);

  // find all sets
  let result = true
  while (result) {
    result = findSet();
  };

  // find all sets
  pCards = flattenDeck(cards);
  result = true

  let dSets=[];
  while (result) {
    result = findDownSet();
  };

  return (sets.length >= dSets.length) ? sets : dSets;
}


console.log('Sets', JSON.stringify(getSolutions(cards),true));