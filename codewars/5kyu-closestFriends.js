function closestFriends(history) {
  history = history.map(function(n){
    let b=[];
    b['number'] = n.match(/^.{15}/)[0].trim();

    var hms = n.match(/.{8}$/);
    var a = hms[0].split(':');
    b['duration'] = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    n = b;
    return n;
  });

  history = history.sort(function(a,b){
    return a.duration < b.duration;
  });
  history = history.slice(0,3);


  var names = phonebook.keys();
  console.log(names);

  history = history.map(function(n){
    let name='';
    console.log(n.number);

    for(var i=0; i<phonebook.length; i++) {
      console.log(phonebook[i]);

      if(phonebook[i]===n.number) {
        name = names[i];
      }
    }
    return name;
  });

  return history;
}

let phonebook = {
  Alfred: '(210) 013-1040',
  Rob: '(424) 012-2013',
  Jason: '(210) 011-0987',
  Betty: '(127) 042-3341',
  Ewa: '(424) 009-3030',
  Bella: '(210) 011-5010',
  Jane: '(424) 013-1032',
  Ray: '(123) 013-7743',
  Mike: '(127) 011-6751',
  Jonathan: '(161) 022-7510',
  Melissa: '(161) 021-6210',
  John: '(110) 010-2689',
  Jack: '(127) 018-6512',
  Michael: '(110) 012-5135',
  Shane: '(424) 017-4123',
  Monica: '(141) 011-6123',
  Rudolf: '(141) 012-6691'
};

var h1 = ["(110) 012-5135 01:11:20", "(141) 011-6123 00:36:46",
  "(424) 009-3030 01:05:32", "(141) 012-6691 01:06:12", "(127) 042-3341 01:59:47",
  "(127) 018-6512 00:32:26", "(424) 017-4123 01:16:58"];
var h2 = ["(123) 013-7743 00:49:47", "(110) 010-2689 01:17:40",
  "(110) 012-5135 00:16:54", "(161) 022-7510 00:16:24", "(127) 011-6751 01:01:53",
  "(424) 012-2013 01:46:29", "(123) 013-7743 00:59:13", "(127) 042-3341 04:32:45"];
var h3 = ["(141) 012-6691 01:12:59", "(110) 012-5135 00:44:20", "(127) 018-6512 01:59:23",
  "(127) 018-6512 01:59:58", "(127) 011-6751 00:05:05", "(210) 013-1040 01:07:19",
  "(424) 012-2013 01:30:37"];
console.log(closestFriends(h1)); // ["Betty", "Shane", "Michael"]);
console.log(closestFriends(h2)); // ["Betty", "Ray", "Rob"]);
console.log(closestFriends(h3)); // ["Jack", "Rob", "Rudolf"]);
