
// IanHuet - v.1
// =========================================

function isHollow(x){
  // check array length
  if(x.length < 3) {
    return false;
  }

  // check array all zeroes
  var zeroed = x.every(function(e,i,a){
    return e==0;
  });
  if (zeroed) { return true; }

  var zeros = false;
  var zeroL=0, zeroM=0;
  for(var i=0; i<x.length; i++) {
    if(x[i]==0) {
      if(x[i+1]==0 && x[i+2]==0 && zeros==false) {
        zeros = true;
      }
      if(x[i]==0) {
        zeroL++;
        
        if(zeroL > zeroM) {
          zeroM = zeroL;
        }
      } else {
        zeroL == 0;
      }
    }
  }
  if(zeros && (x[0]==0 || x[x.length-1]==0)) {
    return false;
  }
  if(x.length%2 != zeroM%2) {
    return false;
  }
  return zeros;
}



// Best Practice
// =========================================

function isHollow(x){
  return /^(1*)0{3,}\1$/.test(x.map(x=>x?1:0).join(''))
}
