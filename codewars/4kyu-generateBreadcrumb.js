function generateBC(url, separator){
  var crumbs = url.replace(/^(http|https):\/\//, '').replace(/\/index.([^/]*)$/, '').replace(/\/$/, '').split('/');
  var breadcrumbs = '';

  if(crumbs.length <= 1) {
    breadcrumbs = '<span class="active">HOME</span>';
  }
  else {
    var base = crumbs.shift();
    var current = crumbs.pop();
    var crumbed = crumbs;

    var glutenFree = function(str) {
      var exempt = ["the","of","in","from","by","with","and","or","for","to","at","a"];
      return str.split('-').filter(e => !exempt.includes(e)).map(n => n.charAt(0)).join('');
    };
    var getPath = function(array,i){
      var path = '';
      for(var v=0; v<i; v++){ path += '/'+ array[v]; }
      return path + '/';
    };
    var makeBread = crumbed.map(function(c,i){
      c = (c.length > 30) ? glutenFree(c) : c;
      return '<a href="'+ getPath(crumbs,i+1) + '">' + c.toUpperCase().replace(/-/g,' ') + '</a>';
    });

    current = (current.search(/(\.|\?|#)/)>-1) ? current.split(/(\.|\?|#)/)[0] : current;
    current = (current.length > 30) ? glutenFree(current) : current;

    breadcrumbs = (makeBread.length > 0) ? separator+ makeBread.join(separator) : '';
    breadcrumbs = '<a href="/">HOME</a>' +breadcrumbs +separator +'<span class="active">' +current.toUpperCase().replace(/-/g,' ') +'</span>';  
  }

  return breadcrumbs;
}