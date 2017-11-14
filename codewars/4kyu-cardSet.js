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


  const findAllSet = () => {
    let cardLen=12, pSet;

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
              pSet = [deckPos(pCards[x]), deckPos(pCards[y]), deckPos(pCards[z])];
              if(sets.indexOf(pSet) == -1){
                sets.push(pSet);
    } } } } } }
  }



  // init
  let sets=[];
  let pCards = flattenDeck(cards);

  // find all sets
  // let result = true
  // while (result) {
  //   result = findSet();
  // };

  findAllSet();

  return sets;
}


console.log('Sets', JSON.stringify(getSolutions(cards),true));
