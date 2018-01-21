'use strict';

function treasure(maze, x, y) {

  let cnt=0;
  let current=[], cell=[], queue=[], visited=[];

  const mapValue = (cell) => {
    let cX=cell[0], cY=cell[1];
    return maze[cY-1].charAt(cX-1);
  }
  const newCell = (cell) => {
    return visited.filter(v => v[0]==cell[0] && v[1]==cell[1]).length==0;
  }
  const notWall = (cell) => {
    return mapValue(cell) !== 'X' && newCell(cell);
  }

  queue.push([x,y]);

  while (queue.length > 0) {
    cnt++;
    current = queue.pop();

    if (mapValue(current) !== ' ') {
      return 'The treasure is ' + mapValue(current) + ' :)';
    } else {
      visited.push(current);
    }

    cell = [current[0],current[1]-1];
    if (notWall(cell)) queue.push(cell);

    cell = [current[0]-1,current[1]];
    if (notWall(cell)) queue.push(cell);

    cell = [current[0]+1,current[1]];
    if (notWall(cell)) queue.push(cell);

    cell = [current[0],current[1]+1];
    if (notWall(cell)) queue.push(cell);
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