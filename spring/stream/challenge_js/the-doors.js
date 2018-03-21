'use strict'

// Test #1
// function initDoors (noDr) {
//   return noDr;
// }

// Test #2
// function initDoors (noDr) {
//   if(noDr >= 1) {  
//     return noDr;  
//   }
  
//   return false;
// }

// Test #3
// function initDoors (noDr) {
//   if(noDr >= 1) {
//     let doors = Array.apply(null, Array(noDr)).map(Number.prototype.valueOf,3);
//     return doors;  
//   }
  
//   return false;
// }


// Test #4
function initDoors (noDr) {
  if(noDr >= 1) {
    let doors = Array.apply(null, Array(noDr)).map(Number.prototype.valueOf,0);
  
    doors.map((n,x) => {
      for(var y=x; y<doors.length; y++) {
        if (y%x==0) {
          doors[y] = (doors[y]) ? 0 : 1;
        }
      }
    });
  
    return doors;  
  }
  
  return false;
}

// function outputDoors (doors) {
//   let doorStr = '';
//   doors.forEach((n,x) => doorStr += doors[x] + ', ');
//   console.log(doorStr);
// }


module.exports = { initDoors };