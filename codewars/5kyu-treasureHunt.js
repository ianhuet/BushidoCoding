// REFACTOR
// mapValue && canExplore are using different parameter formats
// check directions by loop
// treasure found or all done > more elegant done tracking...
// rationalise map co-ordinates

function treasure(maze, x, y) {

  const mapValue = (cell) => {
    let cX=cell[0], cY=cell[1];
    return maze[cX-1].charAt(cY-1);
  }
  const newCell = (cell) => visited.indexOf(cell) === -1;
  const notWall = (cell) => mapValue(cell) !== 'X' && newCell(cell);

  let cnt=0;
  let current=[], cell=[], queue=[], visited=[];


  queue.push([x,y]);
  while (queue.length > 0) {
    cnt++;
    current = queue.pop();

    // console.log('mapValue', c, x, y, x-1, y-1, ':' + maze[x-1] + ':', '.' + maze[x-1].charAt(y-1) + '.', '/' + maze[x].charAt(y) + '/');
    // console.log('c', current, mapValue(current));

    if (mapValue(current) === ' ') visited.push(current);
    if (mapValue(current) !== ' ') return 'The treasure is ' + mapValue(current) + ' :)';

    cell = [current[0],current[1]-1];
    if (notWall(cell)) queue.push(cell);

    cell = [current[0]-1,current[1]];
    if (notWall(cell)) queue.push(cell);

    cell = [current[0]+1,current[1]];
    if (notWall(cell)) queue.push(cell);

    cell = [current[0],current[1]+1];
    if (notWall(cell)) queue.push(cell);
      
    console.log('Visited', cnt, visited);
    console.log('Hunt', queue, queue.length);
  }

  return 'No treasure found :(';
}


// var maze = [
//   "XXXX",
//   "X XX",
//   "X TX",
//   "XXXX"
// ];

var maze = [
  'XXXXXXX',
  'X  X  X',
  'X  X  X',
  'X  XXXX',
  'X X   X',
  'XAX B X',
  'XXXXXXX'
];
console.log(treasure(maze,2,2));