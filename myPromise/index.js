const Promise = require("./myPromise");

const p = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  resolve("timeout");
  //   }, 1000);
});

p.then(
  (res) => {
    console.log("1", res);
    return new Promise((resolve, reject) => {
      resolve("promise2");
    });
  },
  (err) => {
    console.log("error", err);
  }
)
  .then(
    (res) => {
      console.log("2", res);
      return new Promise((resolve, reject) => {
        resolve("promise3");
      });
    },
    (err) => {
      console.log("error2", err);
    }
  )
  .then(
    (res) => {
      console.log("3", res);
    },
    (err) => {
      console.log("error3", err);
    }
  );
