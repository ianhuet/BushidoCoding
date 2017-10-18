function liftingCalc(w){
  let wgt = [ 20, 15, 10, 5, 2.5, 1.25 ];
  let target = (w-20)/2;
  let weights=[], i=0, c=0;

  if(target > 0) {
    weights = [];
    while( target > 0 && c<20){
      if( target >= wgt[i] ){
        while (target >= wgt[i] && c<20){
          weights.push(wgt[i]);
          target = target - wgt[i];
          c++;
        }
      }
      i++; c++;
    }
  }

  return (target !== 0) ? false : weights;
}
