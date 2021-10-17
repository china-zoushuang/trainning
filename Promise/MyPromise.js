function resolvePromise(x, resolve, reject) {
  if (typeof x === "object") {
    x.then(
      (res) => resolve(res),
      (err) => reject(err)
    );
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(excutor) {
    this.status = "pending";
    this.res = null;
    this.err = null;
    this.successCallbacks = [];
    this.failCallbacks = [];

    let resolve = (res) => {
      if (this.status === "pending") {
        this.status = "success";
        this.res = res;
        this.successCallbacks.forEach((callback) => callback());
      }
    };

    let reject = (err) => {
      if (this.status === "pending") {
        this.status = "fail";
        this.err = err;
        this.failCallbacks.forEach((callback) => callback());
      }
    };

    excutor(resolve, reject);
  }
  then(successCallback, failCallback) {
    return new Promise((resolve, reject) => {
      if (this.status === "success") {
        let x = successCallback(this.res);
        resolvePromise(x, resolve, reject);
      }
      if (this.status === "fail") {
        let x = failCallback(this.err);
        resolvePromise(x, resolve, reject);
      }
      if (this.status === "pending") {
        this.successCallbacks.push(() => {
          let x = successCallback(this.res);
          resolvePromise(x, resolve, reject);
        });
        this.failCallbacks.push(() => {
          let x = failCallback(this.err);
          resolvePromise(x, resolve, reject);
        });
      }
    });
  }
}

// 线性执行函数
Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    promises.forEach((item, index) => {
      item.then((res) => {
        results.push(res);
        if (index === promises.length - 1) {
          resolve(results);
        }
      });
    });
  });
};

Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((item) => {
      item.then((res) => {
        resolve(res);
      });
    });
  });
};

module.exports = Promise;
