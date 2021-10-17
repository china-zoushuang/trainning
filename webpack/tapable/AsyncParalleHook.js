// const {AsyncParallelHook} = require('tapable')

class AsyncParallelHook {
    constructor(args) {
        this.tasks = []
    }

    tap(key, task) {
        this.tasks.push(task)
    }

    callAsync(...args) {
        const callback = args.pop()
        callback()
        this.tasks.forEach(task => task(...args))
    }

    // task 要求返回一个 promise
    tapPromise(key, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        return new Promise((resolve, reject) => {
            const promises = this.tasks.map(task => task(...args))
            Promise.all(promises).then(resolve, reject)
        })
    }
}

const asyncParallelHook = new AsyncParallelHook(['name'])

// /*** tap & callAsync ****/
// asyncParallelHook.tap('event1', function(name) {
//     setTimeout(() => {
//         console.log('event1', name)
//     }, 1000);
// })


// asyncParallelHook.callAsync('zs', function() {
//     console.log('all done')
// })

/*** tapPromise & promise ****/
asyncParallelHook.tapPromise('event2', function(name) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log('event2')
            resolve()
        }, 1000);
    })
})
// asyncParallelHook.tapPromise('event3', function(name) {
//     return new Promise(function(resolve, reject) {
//         setTimeout(() => {
//             console.log('event3')
//             reject() // reject() 时，最后的回调就不会再调用了
//         }, 1000);
//     })
// })

asyncParallelHook.promise('zs').then(() => {
    console.log('all done')
})