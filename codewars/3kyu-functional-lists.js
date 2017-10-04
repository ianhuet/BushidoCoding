function LinkedList(){  
  this.head = null;
}
LinkedList.prototype.push = function(val){
  var node = {
    value: val,
    next: null
  }
  if(! this.head){
    this.head = node;
  } else {
    current = this.head;
    while(current.next){
      current = current.next;
    }
    current.next = node;
  }
  return this;
}
LinkedList.prototype.isEmpty = function(){
  return this._length;
}
LinkedList.prototype.toString = function(){
  return this._length;
}


var mt, l1, l2, l3, l4;
mt = new LinkedList();
l1 = mt.push('c').push('b').push('a');
console.log(l1);

// l2 = l1.insertAfter(l1);
// l3 = l1.remove('b');
// l4 = l2.remove('b');
