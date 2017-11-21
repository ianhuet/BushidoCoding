var rp = require('request-promise');


function getGiffySearch(q) {
  var options = {
    uri: 'http://api.giphy.com/v1/gifs/search?api_key=ADzCz2YNl7jYztX9tx3sdAKE9X8IoHd9&q=' + q,
    transform: function (body){
      return JSON.parse(body);
    }
  };

  return rp(options)
    .then(function(body) {
      body.data.forEach(n => console.log(n));
    });
}

let data = getGiffySearch('cats');
