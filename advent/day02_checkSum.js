/**
--- Day 2: Corruption Checksum ---
http://adventofcode.com/2017/day/2

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery 
process is on the right track, they need you to calculate the spreadsheet's checksum. For 
each row, determine the difference between the largest value and the smallest value; 
the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8

The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?
*/


let i = `104 240 147 246 123 175 372 71 116 230 260 118 202 270 277 292
740 755 135 205 429 822 844 90 828 115 440 805 526 91 519 373
1630 991 1471 1294 52 1566 50 1508 1367 1489 55 547 342 512 323 51
1356 178 1705 119 1609 1409 245 292 1434 694 405 1692 247 193 1482 1407
2235 3321 3647 212 1402 3711 3641 1287 2725 692 1235 3100 123 144 104 101
1306 1224 1238 186 751 734 1204 1275 366 149 1114 166 1118 239 153 943
132 1547 1564 512 2643 2376 2324 2159 1658 107 1604 145 2407 131 2073 1878
1845 91 1662 108 92 1706 1815 1797 1728 1150 1576 83 97 547 1267 261
78 558 419 435 565 107 638 173 93 580 338 52 633 256 377 73
1143 3516 4205 3523 148 401 3996 3588 300 1117 2915 1649 135 134 182 267
156 2760 1816 2442 2985 990 2598 1273 167 821 138 141 2761 2399 1330 1276
3746 3979 2989 161 4554 156 3359 173 3319 192 3707 264 762 2672 4423 2924
3098 4309 4971 5439 131 171 5544 595 154 571 4399 4294 160 6201 4329 5244
728 249 1728 305 2407 239 691 2241 2545 1543 55 2303 1020 753 193 1638
260 352 190 877 118 77 1065 1105 1085 1032 71 87 851 56 1161 667
1763 464 182 1932 1209 640 545 931 1979 197 1774 174 2074 1800 939 161`;



// I changed those empty things into spaces with text editor
function Day02A(text){
  let lines = text.split('\n');
  let res = 0;
  for(let i = 0; i < lines.length; i++){
  let arr = lines[i].split(' ');
    res += Math.max(...arr)-Math.min(...arr);
  }
  return res;
}
function Day02B(text){
  let lines = text.split('\n');
  let res = 0;
  for(let i = 0; i < lines.length; i++){
    let arr = lines[i].split(' ');
    arr = arr.map(Number);//if I keep it in string, then they sort to ["231", "1414", "132"]
    arr = arr.sort((a, b)=>{return b-a;});
    for(let j = 0; j < arr.length-1; j++){
      for(let k = j+1; k < arr.length; k++){
        if(arr[j]%arr[k] == 0){
          res += arr[j]/arr[k];
        }
      }
    }
  }
  return res;
}

console.log(Day02A(i));
console.log(Day02B(i));
