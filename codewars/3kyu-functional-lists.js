function List() {
  this.head = null;
  this.length = 0;
}

function EmptyList() {
  this.next = null;
}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function() {
  let str='';
  if(this.head){
    current = this.head;
    str += current.value;
    while(current.next){
      str += current.value;
      current = current.next;
    }
  }
  return '('+ str +')';
};
EmptyList.prototype.isEmpty = function() { return (this.length === 0) ? true: false; };
EmptyList.prototype.length = function() { return this.length; };
EmptyList.prototype.push = function(val){
  let node = new ListNode(val, null);
  if(! this.head) {
    this.head = node;
    this.length = 1;
  }
  else {
    // Reverse Order
    // current = this.head;
    // while (current.next) {
    //   current = current.next;
    // }
    // current.next = node;

    // Standard Order
    current = this.head;
    this.head = node;
    this.head.next = current;
    this.length++;
  }
  return this;
};
EmptyList.prototype.slice = function(position) {
  var currentNode = this.head,
      length = this._length,
      count = 0,
      message = {failure: 'Failure: non-existent node in this list.'},
      beforeNodeToDelete = null,
      nodeToDelete = null,
      deletedNode = null;

  if (position < 0 || position > length) {
    throw new Error(message.failure);
  }

  if (position === 1) {
    this.head = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this._length--;
     
    return deletedNode;
  }

  while (count < position) {
    beforeNodeToDelete = currentNode;
    nodeToDelete = currentNode.next;
    count++;
  }

  beforeNodeToDelete.next = nodeToDelete.next;
  deletedNode = nodeToDelete;
  nodeToDelete = null;
  this._length--;

  return deletedNode;
};
EmptyList.prototype.remove = function(val) {
  if(! this.head){
    return this;
  }

  let index = 1;
  current = this.head;
  if(current.value == val) {
    this.slice(index);
  }

  current = current.next;
  while(current.next){
    index++;
    if(current.value == val) {
      this.slice(index);
    }
    current = current.next;
  }
  return this;
}
EmptyList.prototype.append = function(list) {
  console.log('Start append');
  console.log(JSON.stringify(this, true));
  console.log(JSON.stringify(list, true));

  if(! this.head){
    this.head = list;
  } else {
    current = this.head;
    while(current.next){
      current = current.next;
    }
    current.next = list;
  }
  return this;
};

function ListNode(value, next) {
  this.value = value;
  this.next = next;
}
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;
ListNode.prototype.push = function() {};

var list0 = new EmptyList();
// console.log(list0);
// console.log('0: ' + list0.toString());         // => "()"
// console.log(JSON.stringify(list0,true));

var list1 = list0.push(3);
console.log(list1);
// console.log('1: ' + list1.toString());      // => "(3)"
// console.log('1: ' + JSON.stringify(list1, true));
//
var list2 = list1.push(2);
console.log(list2);
// // console.log('2: ' + list2.toString());      // => "(2 3)"
// // console.log('2: ' + JSON.stringify(list2, true));
//
var list3 = list2.push(1);
console.log(list3);
// // console.log('3: ' + list3.toString());      // => "(1 2 3)"
// // console.log('3: ' + JSON.stringify(list3, true));

// console.log(list1 instanceof ListNode
// list1.tail() instanceof EmptyList
//
// console.log('-------------------');
// console.log('0: ' + JSON.stringify(list0, true));
// console.log('1: ' + JSON.stringify(list1, true));
// console.log('2: ' + JSON.stringify(list2, true));
// console.log('3: ' + JSON.stringify(list3, true));
//
// var list13 = list1.append(list3);
// // console.log('4: ' + list13.toString());     // => "(3 1 2 3)"
// console.log(JSON.stringify(list13, true));



// var mt, l1, l2, l3, l4;
// mt = new EmptyList();
// l1 = mt.push('c').push('b').push('a');

// l2 = l1.append(l1);
// l3 = l1.remove('b');
// l4 = l2.remove('b');


// console.log(l1);
// if( !l1.isEmpty()) {
//   console.log("Non-empty list is not empty");
// } else {
//   console.log(l1.toString());
// }


// console.log(mt);
// console.log(l1);
// console.log(l2);
// console.log(l3);
// console.log(l4);

// console.log(l3.toString());



// ********************************************

/*
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
LinkedList.prototype.append = function(list) {
  if(! this.head){
    this.head = list;
  } else {
    current = this.head;
    while(current.next){
      current = current.next;
    }
    current.next = list;
  }
  return this;
}
LinkedList.prototype.slice = function(position) {
  var currentNode = this.head,
      length = this._length,
      count = 0,
      message = {failure: 'Failure: non-existent node in this list.'},
      beforeNodeToDelete = null,
      nodeToDelete = null,
      deletedNode = null;

  if (position < 0 || position > length) {
    throw new Error(message.failure);
  }

  if (position === 1) {
    this.head = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this._length--;
     
    return deletedNode;
  }

  while (count < position) {
    beforeNodeToDelete = currentNode;
    nodeToDelete = currentNode.next;
    count++;
  }

  beforeNodeToDelete.next = nodeToDelete.next;
  deletedNode = nodeToDelete;
  nodeToDelete = null;
  this._length--;

  return deletedNode;
};
LinkedList.prototype.remove = function(val) {
  if(! this.head){
    return this;
  }

  let index = 1;
  current = this.head;
  if(current.value == val) {
    this.slice(index);
  }

  current = current.next;
  while(current.next){
    index++;
    if(current.value == val) {
      this.slice(index);
    }
    current = current.next;
  }
  return this;
}
LinkedList.prototype.isEmpty = function(){
  return this._length;
}
LinkedList.prototype.toString = function(){
  let str='';
  if(this.head){
    current = this.head;
    while(current.next){
      str += current.value;
      current = current.next;
    }
  }
  return '('+ str +')';
}
*/

/*
var mt, l1, l2, l3, l4;
mt = new LinkedList();

// l1 = mt.push('c').push('b').push('a');
l1 = mt.push('a');
l1 = mt.push('b');
l1 = mt.push('c');
l1 = mt.push('d');

l1 = mt.push('e');
l1 = mt.push('f');

console.log(l1);
console.log(l1.toString());

l2 = l1.append(l1);
console.log(l2.toString());

l3 = l1.remove('b');
l4 = l2.remove('b');
console.log(l3.toString());
console.log(l4.toString());

*/
