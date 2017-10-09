class HallOfFame{

  constructor(size, players) {
    this.size = size;
    this.players = new Array(size).join(".").split(".");
    if(players !== undefined) {
      players.sort(playerSort);
      for(var i=0; i<size; i++){
        this.players[i] = players[i];
      }
    }
  }

  get list(){
    let response = this.players.map(n => (n !== '') ? n[0] +': '+ n[1] : n);
    return response;
  }

  add( player ){
    this.players.unshift(player);
    this.players.sort(playerSort);
    this.players = this.players.slice(0, this.size);
    return this;
  }

  playerSort(a, b) {
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
}
