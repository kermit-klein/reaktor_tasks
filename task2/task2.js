const fs = require("fs");
const text = fs.readFileSync("./data2.txt").toString("utf-8");
const data = text.split("");

function findPass() {
  let char = "P";
  let charArr = [];
  let genData = data;
  while (char !== ";") {
    charArr.push(char);
    let indices = [];
    let idx = genData.indexOf(char);
    while (idx != -1) {
      indices.push(idx + 1);
      idx = genData.indexOf(char, idx + 1);
    }
    let nextData = indices.map((e) => genData[e]);
    char = mySort(charFreq(nextData))[0][0];
  }
  return charArr + "";
}

function charFreq(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj.hasOwnProperty(arr[i])) {
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }
  return Object.entries(obj);
}

function mySort(arr) {
  arr.sort((a, b) => b[1] - a[1]);
  return arr;
}

console.log(findPass());
