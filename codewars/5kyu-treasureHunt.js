// REFACTOR
// x same cell added to visited multiple times?
// x check directions by loop

// x treasure found or all done > more elegant done tracking...
// x rationalise map co-ordinates
// x mapValue && canExplore are using different parameter formats


function treasure(maze, x, y) {

  let cnt=0;
  let current=[], cell=[], queue=[], visited=[];

  const mapValue = (cell) => {
    let cX=cell[0], cY=cell[1];
    return maze[cY-1].charAt(cX-1);
  }
  const newCell = (cell) => {
    // console.log('nC', cnt, cell, visited.indexOf(cell));
    // let result = visited.filter(v => v[0]==cell[0] && v[1]==cell[1])
    return visited.filter(v => v[0]==cell[0] && v[1]==cell[1]).length==0;
  }
  const notWall = (cell) => {
    // console.log('nW', cell, mapValue(cell), newCell(cell));
    // console.log('nW', cell[0], cell[1], mapValue(cell), mapValue(cell) !== 'X' && newCell(cell));
    return mapValue(cell) !== 'X' && newCell(cell);
  }

  queue.push([x,y]);

  console.log(maze);
  console.log('--------------- START', x, y, mapValue([x,y]));
  console.log('Visited', cnt, JSON.stringify(visited,true));
  console.log('Hunt', JSON.stringify(queue,true), queue.length);

  while (queue.length > 0) {
    cnt++;
    current = queue.pop();

    if (mapValue(current) !== ' ') {
      return 'The treasure is ' + mapValue(current) + ' :)';
    } else {
      visited.push(current);
    }

    console.log('Current', current);

    cell = [current[0],current[1]-1];
    if (notWall(cell)) queue.push(cell);
    
    console.log('Wall', cell, queue.length, queue);


    cell = [current[0]-1,current[1]];
    if (notWall(cell)) queue.push(cell);
    
    console.log('Wall', cell, queue.length, queue);


    cell = [current[0]+1,current[1]];
    if (notWall(cell)) queue.push(cell);
    
    console.log('Wall', cell, queue.length, queue);


    cell = [current[0],current[1]+1];
    if (notWall(cell)) queue.push(cell);
    
    console.log('Wall', cell, queue.length, queue);


    console.log('Visited', cnt, JSON.stringify(visited,true));
    console.log('Queue', JSON.stringify(queue,true), queue.length);
    console.log('---------------');
  }

  return 'No treasure found :(';
}


// var maze = [ "XXXX", "X XX", "X TX", "XXXX" ];

// var maze = [ "XXXXXXX","X  X  X","X  X  X","X  XXXX","X X   X","XAX B X","XXXXXXX" ];

var maze = [
  'XXXXXXX',
  'X X   X',
  'X X X X',
  'X XMX X',
  'X XXX X',
  'X     X',
  'XXXXXXX'
];
console.log(treasure(maze,2,2));