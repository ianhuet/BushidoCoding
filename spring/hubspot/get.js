var request = require('request');

let getDataPoint = 'https://candidate.hubteam.com/candidateTest/v2/partners?userKey=ba5fd9dfe194dfd4e6a17f43f50f';
let data;
request(getDataPoint, function(e, r, b){
  console.log(b);
  data = b;
});

console.log(data);