function LinkedList(){
  this.head = null;
}
LinkedList.prototype.push = function(val){
  let node = {
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
// LinkedList.prototype.insertAfter = function(val) {
//   let node = {
//     value: val,
//     next: null
//   }
//   if(! this.head){
//     this.head = node;
//   } else {
//     current = this.head;
//     while(current.next){
//       current = current.next;
//     }
//     current.next = node;
//   }
//   return this;
// }
LinkedList.prototype.isEmpty = function(){
  return this._length;
}
LinkedList.prototype.toString = function(){
  let str = '(';
  if(this.head){
    current = this.head;
    while(current.next){
      str += current.value;
      current = current.next;
    }
  }
  return str + ')';
}


var mt, l1, l2, l3, l4;
mt = new LinkedList();
console.log(mt.toString());
l1 = mt.push('c').push('b').push('a');
console.log(l1);
console.log(l1.toString());

// l2 = l1.insertAfter(l1);
// console.log(l2);

// l3 = l1.remove('b');
// l4 = l2.remove('b');
