const fs = require("fs");
const text = fs.readFileSync("./data3.txt").toString("utf-8");
const data = text.split("\n");

const incX = { U: 0, R: 1, D: 0, L: -1 };
const incY = { U: -1, R: 0, D: 1, L: 0 };
const neigh = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

let neurons = {};

data.forEach((route) => {
  let [x, y, ...steps] = route.split(/,| /);
  x = +x;
  y = +y;
  neurons[x + ":" + y] = {};
  steps.forEach((dir) => {
    if (dir in incX) {
      x += incX[dir];
      y += incY[dir];
      neurons[x + ":" + y] = {};
    } else {
      neurons[x + ":" + y].type = dir;
    }
  });
});

let nodes = Object.keys(neurons).filter((pos) => neurons[pos].type === "S");
let dist = 0;

while (nodes.length) {
  let nextNodes = new Set();
  nodes.forEach((pos) => {
    neurons[pos].dist = dist;
    let [x, y] = pos.split(":").map(Number);
    neigh.forEach(([incX, incY]) => {
      let pos = x + incX + ":" + (y + incY);
      if (
        pos in neurons &&
        neurons[pos].type !== "X" &&
        !("dist" in neurons[pos])
      ) {
        nextNodes.add(pos);
      }
    });
  });
  nodes = [...nextNodes];
  dist++;
}
