var HallOfFame= function(size, players) {
  this.size = size;
  this.players = new Array(this.size).join(".").split(".");

  if(players !== null) {
    players.sort(function(a, b) {
      return parseInt(b[1]) - parseInt(a[1]);
    });
    for(var i=0; i < size; i++){
      this.players[i] = players[i];
    }
  }
};

HallOfFame.prototype.emptyPlayer = function(i){
  // console.log(typeof this.players);
  // console.log(this.players);

  if (this.players !== null && this.players[i] !== '') {
    return true;
  }
  return true;
};

HallOfFame.prototype.list= function(){
  return this.players.map(function(i){
    return (! this.emptyPlayer(i)) ? this.players[i][0] +': '+ this.players[i][1] : "" ;
  }).toString();
};

HallOfFame.sortPlayers = function(){
  this.players = this.players.sort(function(a, b) {
    return parseInt(b[1]) - parseInt(a[1]);
  });
};

HallOfFame.add= function( player ){
  if(this.players !== null) {
    console.log('Add Player: ' + player);
    this.players.unshift( player );
    this.sortPlayers();
  } else {
    console.log('New Player: ' + this.players);
    this.players = player;
  }
  return this;
};

var top3 = new HallOfFame(3, [["Ada",99], ["Bob",42], ["Clo", 101], ["Dan", 3]]);
console.log(top3);
console.log(top3.list);

// var top3Empty = new HallOfFame(3);
// console.log(top3Empty);
// console.log(top3Empty.list);
// console.log('--------------------');
//
// top3Empty.add(["Ada",44]);
// console.log(top3Empty);
// console.log(top3Empty.list); // ["Ada: 44",'','']


// top3.add(["Dan",54])
// top3.list -> ["Clo: 101", "Ada: 99", "Dan: 54"]

// top3.add(["Eva",75]).add(["Fox",120]).list --> ["Fox: 120","Clo: 101","Ada: 99"]

// var top5 = new HallOfFame(); // -- size=5 by default
// top5.add(["A",4]).add(["E",3]).add(["I",1])
// top5.list; // --> ["A: 4","E: 3","I: 1","",""] // <-- 2 "empty players" at the end of list

// top5.add(["S",5]).add(["T",7])
// top5.list --> ["T: 7","S: 5","A: 4","E: 3","I: 1"]