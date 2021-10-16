function resolvePromise() {}

class Promise {
  constructor(excutor) {
    this.status = "pending";
    this.res = null;
    this.err = null;
    this.successCallbacks = [];
    this.failCallbacks = [];
    const resolve = (res) => {
      if (this.status === "pending") {
        this.status = "success";
        this.res = res;
        this.successCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (err) => {
      if (this.status === "pending") {
        this.status = "fail";
        this.err = err;
        this.failCallbacks.forEach((fn) => fn());
      }
    };
    excutor(resolve, reject);
  }
  then(success, fail) {
    if (this.status === "success") {
      let x = success(this.res);
      // promise2 依赖上一个结果 x
      let promise2 = new Promise((resolve, reject) => {
        if (typeof x === "object") {
          //   let then = x.then;
          //   then.call(
          //     x,
          //     (res) => resolve(res),
          //     (err) => reject(err)
          //   );
          x.then(
            (res) => resolve(res),
            (err) => reject(err)
          );
        } else {
          resolve(x);
        }
      });
      return promise2;
    }
    if (this.status === "fail") {
      fail(this.err);
    }
    if (this.status === "pending") {
      this.successCallbacks.push(() => {
        return success(this.res);
      });
      this.failCallbacks.push(() => {
        return fail(this.err);
      });
    }
  }
}
module.exports = Promise;
