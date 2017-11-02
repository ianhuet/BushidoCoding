let Result = { "win": 1, "loss": 2, "tie": 3 };

function PokerHand(cards){
  let order = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];
  let rank = { score: 0, highCard: 0 };
  let hand;
  let count=[];

  // Sort Cards
  hand = cards.split(" ");
  hand.sort((a,b) => order.indexOf(b[0]) - order.indexOf(a[0]));

  // Count Cards
  count = this.countCards(hand);

  // Property Get/Set
  this.getHand = function(){
    return hand;
  };
  this.getCount = function(){
    return count;
  };
  this.getOrder = function(){
    return order;
  };
  this.getRank = function(){
    return rank;
  };
  this.setRank = function(score, highCard){
    rank.score = score;
    rank.highCard = highCard;
  };
}


PokerHand.prototype.isRoyalFlush = function(cards){
  return cards[0][0]==="A" && this.isStraightFlush(cards);
};

PokerHand.prototype.isStraightFlush = function(cards){
  return this.isStraight(cards) && this.isFlush(cards);
};

PokerHand.prototype.isFourOfAKind = function(cards){
  let count = this.getCount();
  return count[0]===4;
};

PokerHand.prototype.isFullHouse = function(cards){
  let count = this.getCount();
  return count[0]===3 && count[1]===2;
};

PokerHand.prototype.isFlush = function(cards){
  let _rank = this.getOrder();
  for(let x=1; x<cards.length; x++){
    if(cards[x-1][1] !== cards[x][1]){
      return false;
    }
  }
  return true;
};

PokerHand.prototype.isStraight = function(cards){
  let _rank = this.getOrder();
  for(let x=1; x<cards.length; x++) {
    if(_rank.indexOf(cards[x-1][0])-1 !== _rank.indexOf(cards[x][0])) {
      return false;
    }
  }
  return true;
};

PokerHand.prototype.isThreeOfAKind = function(cards){
  let count = this.getCount();
  return count[0]===3;
};

PokerHand.prototype.isTwoPair = function(cards){
  let count = this.getCount();
  return count[0]===2 && count[1]===2;
};

PokerHand.prototype.isOnePair = function(cards){
  let count = this.getCount();
  return count[0]===2;
};

PokerHand.prototype.isHighCard = function(cards){
  return true;
};

PokerHand.prototype.rankKicker = function(opponent){
  let p = this.getHand();
  let o = opponent.getHand();
  let _rank = this.getOrder();

  for(let x=0; x<p.length; x++){
    if(p[x][0] > o[x][0] || p[x][0] < o[x][0]){
      this.setRank(1, _rank.indexOf(p[x][0]));
      opponent.setRank(1, _rank.indexOf(o[x][0]));
      break;
    }
  }
};


PokerHand.prototype.countCards = function(cards){
  let ch, count, counts={}, countSort=[];
  let hand = cards.map(function(n){
    return n[0];
  });

  hand = hand.join("");
  for(let x=0; x<hand.length; x++) {
    ch = hand.charAt(x);
    count = counts[ch];
    counts[ch] = count ? count+1 : 1;
  }

  for (let n in counts) {
    countSort.push(counts[n]);
  }
  countSort.sort((a,b) => b-a);
  return countSort;
};

PokerHand.prototype.rankHand = function(player){
  let hand = player.getHand();
  let _rank = this.getOrder();
  let highCard = _rank.indexOf(hand[0][0]);

  if(this.isRoyalFlush(hand)){
    player.setRank(10, highCard);
  }
  else if(this.isStraightFlush(hand)){
    player.setRank(9, highCard);
  }
  else if(this.isFourOfAKind(hand)){
    player.setRank(8, highCard);
  }
  else if(this.isFullHouse(hand)){
    player.setRank(7, highCard);
  }
  else if(this.isFlush(hand)){
    player.setRank(6, highCard);
  }
  else if(this.isStraight(hand)){
    player.setRank(5, highCard);
  }
  else if(this.isThreeOfAKind(hand)){
    player.setRank(4, highCard);
  }
  else if(this.isTwoPair(hand)){
    player.setRank(3, highCard);
  }
  else if(this.isOnePair(hand)){
    player.setRank(2, highCard);
  }
  else {
    player.setRank(1, highCard);
  }
};

PokerHand.prototype.compareWith = function(opponent){

  // Rank Hand
  this.rankHand(this);
  opponent.rankHand(opponent);

  let p = this.getRank();
  let o = opponent.getRank();

  // Determine Result
  if(p.score > o.score || (p.score == o.score && p.highCard > o.highCard)){
    return Result.win;
  }
  else if(p.score < o.score || (p.score == o.score && p.highCard < o.highCard)){
    return Result.loss;
  }

  this.rankKicker(opponent);
  p = this.getRank();
  o = opponent.getRank();

  if(p.highCard > o.highCard){
    return Result.win;
  }
  else if(p.highCard < o.highCard){
    return Result.loss;
  }
  else {
    return Result.tie;
  }
};



// var player = "2H 2S 2C 2D 6H"
// var opponent = "KS AS TS QS JS";

var player = "KD QH JH 8H 8S";
var opponent = "KD KC 8S 4S 3H";

var p = new PokerHand(player);
var o = new PokerHand(opponent);

console.log(p.compareWith(o));
