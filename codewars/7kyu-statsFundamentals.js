class DataSet {
  constructor(...data) {
    this.data = data;
    this.mean = 0;
    this.variance = 0;
    this.stdDeviation = 0;

    this.setMean();
    this.setVar();
  }

  setMean() {
    return this.mean = this.data.reduce((t,v) => t + v) / this.data.length;
  }

  setVar() {
    this.variance = this.data
      .map(n => Math.pow(Math.abs(this.mean - n), 2), this)
  .reduce((t,v) => t + v) / this.data.length;
    this.stdDeviation = Math.sqrt(this.variance);
    return this.variance;
  }
}


var myData1 = new DataSet(1,2,3,4,5,6,7);
// var myData1 = new DataSet(6,2,3,1);
console.log(myData1.data);         // [1,2,3,4,5,6,7]

console.log(myData1.mean);         // 4
console.log(myData1.variance);     // 4
console.log(myData1.stdDeviation); // 2