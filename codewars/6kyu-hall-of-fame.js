function playerSort(a, b) {
  if(parseInt(b[1]) === parseInt(a[1])){
    if(b[0] === a[0]){
      return 0;
    } else {
      return a[0] > b[0];
    }
  } else {
    return parseInt(b[1]) - parseInt(a[1]);
  }
  return 0;
}

function HallOfFame(size, players) {
  this.size = size;
  this.players = new Array(size).join(".").split(".");
  if(players !== undefined) {
    players.sort(playerSort);
    for(var i=0; i<size; i++){
      this.players[i] = players[i];
    }
  }
};

HallOfFame.prototype = {
  list: function(){
    let response = this.players.map(n => (n !== '') ? n[0] +': '+ n[1] : n);
    return response;
  },
  add: function(player){
    this.players.unshift(player);
    this.players.sort(playerSort);
    this.players = this.players.slice(0, this.size);
    return this;
  }
};

var top3 = new HallOfFame(3, [["Ada",99], ["Bob",42], ["Clo", 101], ["Dan", 3]]);
console.log(top3);
console.log('List:' + top3.list());


var top3Empty = new HallOfFame(3);
console.log(top3Empty);
console.log('List:' + top3Empty.list());
console.log('--------------------');

top3Empty.add(["Ada",44]);
console.log(top3Empty);
console.log('List:' + top3Empty.list()); // ["Ada: 44",'','']



// HallOfFame.prototype.emptyPlayer = function(i){
//   // console.log(typeof this.players);
//   // console.log(this.players);
//
//   if (this.players !== null && this.players[i] !== '') {
//     return true;
//   }
//   return true;
// };

// HallOfFame.prototype.sortPlayers = function(){
//   this.players = this.players.sort(function(a, b) {
//     return parseInt(b[1]) - parseInt(a[1]);
//   });
// };

// HallOfFame.add = function( player ){
//   if(this.players !== null) {
//     console.log('Add Player: ' + player);
//     this.players.unshift( player );
//     this.sortPlayers();
//   } else {
//     console.log('New Player: ' + this.players);
//     this.players = player;
//   }
//   return this;
// };


// top3.add(["Dan",54])
// top3.list -> ["Clo: 101", "Ada: 99", "Dan: 54"]

// top3.add(["Eva",75]).add(["Fox",120]).list --> ["Fox: 120","Clo: 101","Ada: 99"]

// var top5 = new HallOfFame(); // -- size=5 by default
// top5.add(["A",4]).add(["E",3]).add(["I",1])
// top5.list; // --> ["A: 4","E: 3","I: 1","",""] // <-- 2 "empty players" at the end of list

// top5.add(["S",5]).add(["T",7])
// top5.list --> ["T: 7","S: 5","A: 4","E: 3","I: 1"]



// class HallOfFame{
//
//   constructor(size, players){
//     this.size = size;
//     if(typeof players !== 'undefined') {
//       this.players = players.sort(function(a, b) {
//         return parseInt(b[1]) - parseInt(a[1]);
//       });
//     } else {
//       this.players = null;
//     }
//   }
//
//   get list(){
//     let response = [];
//     for (var i = 0; i < this.size; i++) {
//       response.push((this.players !== null) ? this.players[i][0] +': '+ this.players[i][1] : "" );
//     }
//     return response; // .toString();
//   }
//
//   add( player ){
//     if(this.players !== null) {
//       console.log(player);
//       this.players.push(player);
//     } else {
//       console.log(this.players);
//       this.players = player;
//     }
//   }
//
// }