const fs = require("fs");
const Promise = require("./MyPromise");

const p = new Promise((resolve, reject) => {
  fs.readFile("./Promise/1.text", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const p2 = new Promise((resolve, reject) => {
  fs.readFile("./Promise/2.text", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// p.then(
//   (res) => {
//     console.log(res);
//     return new Promise((resolve, reject) => {
//       fs.readFile("./Promise/2.text", "utf8", (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//   },
//   (err) => {
//     console.log(err);
//   }
// ).then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// Promise.all([p, p2]).then((res) => {
//   console.log(res);
// });

Promise.race([p, p2]).then((res) => {
  console.log(res);
});
