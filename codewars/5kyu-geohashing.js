function geoHashing(dow, date) {
  console.log(dow);
  console.log(date);

  // convert date (or todays date) to format
  let d = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

  if (dt < 10) dt = '0' +dt;
  if (month < 10) month = '0' +month;
  let datum = year +'-' +month +'-' +dt;

  // append dow opening (padded to 2 decimals places)


  // hash date-dow
  datum +=  + '-'.dow;
  let hashed = md5(datum);

  // split hash into 16 digit strings
  // let hashed = "db9318c2259923d08b672cb305440f97";
  let geo = {hashed.substring(0, 16), hashed.substring(16)};

  // convert to decimal

  // construct return array
  return [geo[0], geo[1]]
}




let dow1  = 10458.68;
let date1 = 2005-05-26T00:00:00.000Z

console.log(geoHashing(dow1,date1));