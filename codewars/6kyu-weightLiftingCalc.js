function liftingCalc(w){
  let wgt=[ 20, 15, 10, 5, 2.5, 1.25 ];
  let t=w/2, d=0, i=0, tl=0, weights=[];

  d = t/wgt[i];
  console.log( 'i: ' + i );
  console.log( 'W: ' + wgt[i] );
  console.log( 'T: ' + t );
  console.log( 'D: ' + d );

  // while( t>0 ){
  //   d = t/wgt[i];
  //   if( d>0 ){
  //     console.log( 'D: ' + d );
  //     tl = 0;
  //     for(let x=0; x<d; i++){
  //       weights.push(wgt[i]);
  //       tl -= wgt[i];
  //
  //       console.log( weights );
  //       console.log( tl );
  //     }
  //     t=tl;
  //     console.log( 't: ' + t );
  //   }
  //   i++;
  // }

  return weights;
}

console.log(liftingCalc(250)); // [20, 20, 20, 20, 20, 15]
