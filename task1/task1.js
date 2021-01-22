const fs = require("fs");
const text = fs.readFileSync("./data1.txt").toString("utf-8");
const data = text.split("\n");
const datanext = data.map((e) => e.match(/[0-9]{8}/g));

function findChar(arr) {
  let numbers = arr.map((e) => parseInt(e, 2));
  console.log(numbers);
  let ind = numbers.indexOf(numbers.find((e) => e < arr.length));
  while (numbers[ind] < arr.length) {
    ind = numbers[ind];
  }
  return numbers[ind];
}

function findPass(arr) {
  let pass = [];
  arr.forEach((e) => {
    pass.push(findChar(e));
  });
  let uint8Array = new Uint8Array(pass);
  let decoded = new TextDecoder().decode(uint8Array);
  return decoded;
}

console.log(findPass(datanext));
