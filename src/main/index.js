const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

p1.then((res) => {
  console.log(res);
});
