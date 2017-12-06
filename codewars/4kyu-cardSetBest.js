let cards = [
  [[3,1,1,1],[3,1,1,2],[3,1,1,3]],
  [[2,2,1,1],[1,2,2,2],[1,2,2,3]],
  [[1,1,1,1],[1,2,1,2],[1,1,1,3]],
  [[2,1,1,1],[2,2,2,2],[2,1,1,3]]
];



const unique = (p,i,a) => a.indexOf(p) == i

function getSolutions(cards){
  let flat = cards.reduce((all,row) => all.concat(row)) // Flattened array makes everything easier (converted back at end)
  
  let cardCombos = []
  for (let a = 0; a < 12; a++)                          // Generate all combos of 3 cards
    for (let b = a+1; b < 12; b++)
      for (let c = b+1; c < 12; c++)
        cardCombos.push([a,b,c])
    
  let sets = cardCombos.map(id => id.map(i => flat[i]))                             // Map card indexes to card properties
  .filter(set => set                                                                // Filter out invalid sets...
    .reduce((mesh,card) => mesh.map((props,pi) => props.concat(card[pi])), [[],[],[],[]])  // Interlace properties
    .every(prop => prop.every(p=>p==prop[0]) || prop.every(unique))                        // Compare/contrast properties
  ).map(set => set.map(card => flat.indexOf(card)))   // Done with properties - all we care about now is card indexes
    
  let setCombos = [];
  let f = (list, s) => {                              // Generate all combos of valid sets
    for (var i = 0; i < s.length; i++) {
      let newList = [...list, s[i]]
      setCombos.push(newList)
      f(newList, s.slice(i+1))
    }
  }
  f([], sets)
  
  return setCombos
  .filter(combo => combo.reduce((all,set) => all.concat(set)).every(unique))  // Filter out combos with dupe cards
  .sort((a,b) => b.length - a.length)[0]              // Sort most sets first; grab first one
  .map(set => set.map(i => [~~(i/3), i%3]))           // Map indexes back to [x,y] coordinates
  
}


console.log('Sets', JSON.stringify(getSolutions(cards),true));
// getSolutions(cards);

