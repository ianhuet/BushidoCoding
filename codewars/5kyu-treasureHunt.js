// REFACTOR
// mapValue && canExplore are using different parameter formats
// check directions by loop
// treasure found or all done > more elegant done tracking...
// rationalise map co-ordinates

function treasure(maze, x, y) {

  const mapValue   = (x,y) => maze[x-1].charAt(y-1);
  const beenThere  = (x,y) => done.indexOf([x,y]) === -1;
  const canExplore = (x,y) => maze[x-1].charAt(y-1) != 'X' && ! beenThere(x,y);

  let cnt=0;
  let c=[], t=[], hunt=[], done=[];


  hunt.push([x,y]);
  while (hunt.length > 0 || cnt < 10) {
    cnt++;
    c = hunt.pop();

    if (mapValue(c[0],c[1]) !== 'X') {
      if (mapValue(c[0],c[1]) !== ' ') t.push(mapValue(c[0],c[1]));
      if (mapValue(c[0],c[1]) === ' ') done.push([c[0],c[1]]);
    
      if (canExplore(c[0],c[1]-1)) hunt.push([c[0],c[1]-1]); // check North
      if (canExplore(c[0]-1,c[1])) hunt.push([c[0]-1,c[1]]); // check West
      if (canExplore(c[0]+1,c[1])) hunt.push([c[0]+1,c[1]]); // check East
      if (canExplore(c[0],c[1]+1)) hunt.push([c[0],c[1]+1]); // check South
      
      console.log(c[0], c[1], mapValue([c[0],c[1]]));
  
      console.log('c', c, c[0], c[1]);
      console.log('cVal *', mapValue(c[0],c[1]), '*');
      console.log('Done', cnt, hunt);
      console.log('Hunt', hunt);
    }
  }

  if (t[0]) {
    return 'The treasure is ' + t[0] + ' :)';
  } else {
    return 'No treasure found :(';
  }
}


var maze = [
    "XXXX",
    "X XX",
    "X TX",
    "XXXX"
];
console.log(treasure(maze,2,2));