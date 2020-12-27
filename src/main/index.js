import { add } from "./hello.js";
console.log(add);

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

p1.then((res) => {
  console.log(res);
});
