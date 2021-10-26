// let arr = [6, 1, 3, 6, 7, 2, 46, 124]

// for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//         if (arr[j] < arr[j + 1]) {
//             let tpl = arr[j]
//             arr[j] = arr[j + 1]
//             arr[j + 1] = tpl
//         }
//     }
// }

// console.log(arr)

// const obj = {
//     arr: [
//         {
//             name1: 1,
//             name2: 2,
//         },
//         'value',
//     ],
//     string: 'value',
//     function: () => {}
// }

// function isTypeof(obj, type) {
//     let exactType = Object.prototype.toString.call(obj)
//     switch (type) {
//         case 'Array':
//             return exactType === '[object Array]'
//         case 'Object':
//             return exactType === '[object Object]'
//     }
// }

// function deepClone(obj) {
//     let newObj

//     if (isTypeof(obj, 'Array')) {
//         newObj = []
//         obj.forEach((item, index) => {
//             newObj[index] = deepClone(item)
//         })
//     } else if (isTypeof(obj, 'Object')) {
//         newObj = {}
//         for (let key in obj) {
//             newObj[key] = deepClone(obj[key])
//         }
//     } else {
//         newObj = obj
//     }
//     return newObj

// }

// console.log(deepClone(obj))

// let obj = {
//     inputA: '',
//     inputB: ''
// }

// // let bindObj = new Proxy(obj, {
// //     get(target, key) {
// //         return Reflect.get(target, key)
// //     },
// //     set(target, key, value) {
// //         target.inputB = value
// //         return Reflect.set(target, key, value)
// //     }
// // })

// let bindObj = {}
// Object.keys(obj).forEach(item => {
//     let initValue = ''
//     Object.defineProperty(bindObj, item, {
//         get() {
//             return initValue
//         },
//         set(newVal) {
//             // 监听到了数据变化，可用于视图更新
//             document.querySelector('#B').innerHTML = newVal
//             initValue = newVal
//         }
//     })
// })
// bindObj.inputA = 'aaa'

class Promise {
  constructor(excutor) {
    this.status = "pending";
    this.res = null;
    this.err = null;

    this.successCallbacks = [];

    let resolve = (res) => {
      if (this.status === "pending") {
        this.status = "success";
        this.res = res;
        this.successCallbacks.forEach((callback) => callback());
      }
    };
    let reject = (err) => {};
    excutor(resolve, reject);
  }

  then(callback) {
    return new Promise((resolve, reject) => {
      if (this.status === "pending") {
        let newCallback = (resolve, reject) => {
          let x = callback(this.res);
          if (typeof x === "object") {
            x.then(
              (res) => resolve(res),
              (err) => reject(err)
            );
          } else {
            resolve(x);
          }
        };
        this.successCallbacks.push(() => {
          newCallback(resolve, reject);
        });
      }
    });
  }
}

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

p.then((res) => {
  console.log(res);
  return 2;
}).then((res) => {
  console.log(res);
});
