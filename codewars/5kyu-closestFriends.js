function closestFriends(history) {

  // extract & transform call history
  history = history.map(function(n){
    let b=[];
    b['number'] = n.match(/^.{15}/)[0].trim();
    let hms = n.match(/.{8}$/);
    let a = hms[0].split(':');
    b['duration'] = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return n = b;
  });

  // get longest call list
  history = history.filter(function(n,i) {
    for (let h=0; h<i; h++) {
      if (history[h].number === n.number) {
        history[h].duration += n.duration;
        return false;
      }
    }
    return true;
  }).sort((a,b) => parseInt(b.duration) - parseInt(a.duration)); // .slice(0,3);

  // convert phonebook from obj to array
  let book = Object.keys(phonebook).map(function(key) {
    return [key, phonebook[key]];
  });

  // extract longest call names
  history = history.map(function(n){
    let bk = book.filter(k => k[1] == n.number);
    return bk[0][0];
  });

  return history;
}

let phonebook = {
  Alfred: "(210) 013-1040",
  Rob: "(424) 012-2013",
  Jason: "(210) 011-0987",
  Betty: "(127) 042-3341",
  Ewa: "(424) 009-3030",
  Bella: "(210) 011-5010",
  Jane: "(424) 013-1032",
  Ray: "(123) 013-7743",
  Mike: "(127) 011-6751",
  Jonathan: "(161) 022-7510",
  Melissa: "(161) 021-6210",
  John: "(110) 010-2689",
  Jack: "(127) 018-6512",
  Michael: "(110) 012-5135",
  Shane: "(424) 017-4123",
  Monica: "(141) 011-6123",
  Rudolf: "(141) 012-6691"
};

let h1 = [
  "(110) 012-5135 01:11:20",
  "(141) 011-6123 00:36:46",
  "(424) 009-3030 01:05:32",
  "(141) 012-6691 01:06:12",
  "(127) 042-3341 01:59:47",
  "(127) 018-6512 00:32:26",
  "(424) 017-4123 01:16:58"
];
let h2 = [
  "(127) 042-3341 04:32:45", // Betty
  "(424) 012-2013 01:46:29", // Rob
  "(110) 010-2689 01:17:40", // John
  "(127) 011-6751 01:01:53",
  "(123) 013-7743 00:59:13", // Ray
  "(123) 013-7743 00:49:47",
  "(110) 012-5135 00:16:54",
  "(161) 022-7510 00:16:24"
];
let h3 = [
  "(141) 012-6691 01:12:59",
  "(110) 012-5135 00:44:20",
  "(127) 018-6512 01:59:23",
  "(127) 018-6512 01:59:58",
  "(127) 011-6751 00:05:05",
  "(210) 013-1040 01:07:19",
  "(424) 012-2013 01:30:37"
];
// console.log(closestFriends(h1)); // ["Betty", "Shane", "Michael"]);
// console.log(closestFriends(h2)); // ["Betty", "Ray", "Rob"]);
// console.log(closestFriends(h3)); // ["Jack", "Rob", "Rudolf"]);

let h10 = [
  '(210) 011-5010 00:01:26',
  '(141) 012-6691 00:22:59',
  '(424) 009-3030 01:59:41',
  '(127) 042-3341 01:11:24',
  '(127) 011-6751 00:11:01',
  '(110) 010-2689 01:56:03',
  '(123) 013-7743 00:36:05',
  '(210) 013-1040 00:23:02',
  '(123) 013-7743 01:15:21',
  '(424) 013-1032 00:26:42',
  '(141) 011-6123 00:02:36',
  '(210) 013-1040 01:10:59',
  '(210) 013-1040 00:53:39',
  '(210) 011-5010 01:39:37',
  '(127) 018-6512 00:05:40',
  '(141) 011-6123 00:34:39',
  '(123) 013-7743 00:54:10',
  '(127) 042-3341 01:36:34',
  '(161) 021-6210 01:35:42',
  '(127) 011-6751 00:04:10'
];

console.log(closestFriends(h10));    // ['Betty', 'Ray', 'Alfred']
// console.log(closestFriends(h11)); //
// console.log(closestFriends(h12)); //